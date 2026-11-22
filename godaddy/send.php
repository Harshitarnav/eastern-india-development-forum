<?php
declare(strict_types=1);

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request.']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Mail is not configured.']);
    exit;
}

/** @var array{key?:string,from?:string,to?:array<int,string>} $config */
$config = require $configPath;
$key = trim((string) ($config['key'] ?? ''));
$from = trim((string) ($config['from'] ?? ''));
$to = $config['to'] ?? [];
if ($key === '' || $from === '' || !is_array($to) || $to === []) {
    http_response_code(500);
    echo json_encode(['error' => 'Mail is not configured.']);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw === false ? '' : $raw, true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request.']);
    exit;
}

if (trim((string) ($body['website'] ?? '')) !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name = preg_replace('/\s+/u', ' ', trim((string) ($body['full_name'] ?? ''))) ?? '';
$state = trim((string) ($body['state'] ?? ''));
$place = preg_replace('/\s+/u', ' ', trim((string) ($body['place'] ?? ''))) ?? '';
$intent = trim((string) ($body['intent'] ?? ''));
$email = trim((string) ($body['email'] ?? ''));
$phone = normalize_mobile((string) ($body['phone'] ?? ''));

$states = [
    'Bihar', 'Jharkhand', 'Odisha', 'West Bengal', 'Assam', 'Arunachal Pradesh',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura', 'Other',
];
$intents = [
    'member' => 'Become a member',
    'volunteer' => 'Give my time',
    'local_need' => 'Share a need from my area',
    'partner' => 'Partner or support the work',
];

if (!preg_match('/^[\p{L}\p{M}\s.\'-]{2,80}$/u', $name)) {
    fail(400, 'Enter your full name. पूरा नाम लिखें।');
}
if ($phone === null) {
    fail(400, 'Enter a 10-digit mobile number. 10 अंकों का मोबाइल नंबर लिखें।');
}
if (!in_array($state, $states, true)) {
    fail(400, 'Choose your state. अपना राज्य चुनें।');
}
if (mb_strlen($place) < 2 || mb_strlen($place) > 80) {
    fail(400, 'Enter your district or village. जिला या गाँव लिखें।');
}
if (!isset($intents[$intent])) {
    fail(400, 'Choose how you want to join. जुड़ने का तरीका चुनें।');
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(400, 'That email does not look right. ईमेल सही नहीं है।');
}

$text = implode("\n", [
    'New EIDF signup',
    'Name: ' . $name,
    'Phone: ' . $phone,
    'State: ' . $state,
    'Place: ' . $place,
    'Wants to: ' . $intents[$intent],
    'Email: ' . ($email !== '' ? $email : 'none'),
]);

$log = __DIR__ . '/signups.log';
@file_put_contents(
    $log,
    json_encode([
        'at' => gmdate('c'),
        'full_name' => $name,
        'phone' => $phone,
        'state' => $state,
        'place' => $place,
        'intent' => $intent,
        'email' => $email,
    ], JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND | LOCK_EX
);

$sent = 0;
foreach ($to as $address) {
    $address = trim((string) $address);
    if ($address === '') {
        continue;
    }
    if (resend($key, $from, $address, 'EIDF signup · ' . $name . ' · ' . $state, $text)) {
        $sent++;
    }
}

if ($sent === 0) {
    fail(502, 'Could not send just now. Please try again. अभी भेजा नहीं जा सका।');
}

echo json_encode(['ok' => true]);

function fail(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function normalize_mobile(string $raw): ?string
{
    $digits = preg_replace('/\D+/', '', $raw) ?? '';
    if (strlen($digits) === 12 && str_starts_with($digits, '91')) {
        $digits = substr($digits, 2);
    }
    if (strlen($digits) === 11 && str_starts_with($digits, '0')) {
        $digits = substr($digits, 1);
    }
    if (!preg_match('/^[6-9]\d{9}$/', $digits)) {
        return null;
    }
    return '+91' . $digits;
}

function resend(string $key, string $from, string $to, string $subject, string $text): bool
{
    $payload = json_encode([
        'from' => $from,
        'to' => [$to],
        'subject' => $subject,
        'text' => $text,
    ]);
    $ch = curl_init('https://api.resend.com/emails');
    if ($ch === false) {
        return false;
    }
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $key,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => $payload,
    ]);
    curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    return $status >= 200 && $status < 300;
}
