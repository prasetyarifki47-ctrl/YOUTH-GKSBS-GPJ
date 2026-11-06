<?php
// Wajib ditaruh paling atas untuk membersihkan buffer crash dari LiteSpeed
ob_start();

// Header CORS Lengkap
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

header("Content-Type: application/json; charset=UTF-8");

// Tangkap Error Fatal PHP agar tidak mati diam-diam (Content-Length: 0)
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        ob_end_clean();
        http_response_code(500);
        echo json_encode([
            "success" => false, 
            "message" => "Fatal PHP Error: " . $error['message'] . " (Line " . $error['line'] . ")"
        ]);
    }
});

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput);

if (!$data || empty($data->fullName) || empty($data->church)) {
    ob_end_clean();
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Data pendaftaran tidak boleh kosong."]);
    exit();
}

$username = "youthgk2_natal";
$password = "Mi4sanMi4";
$dbname   = "youthgk2_natal";

// Coba koneksi MySQL via 127.0.0.1
$conn = @new mysqli("127.0.0.1", $username, $password, $dbname);

// Fallback jika 127.0.0.1 gagal
if ($conn->connect_error) {
    $conn = @new mysqli("localhost", $username, $password, $dbname);
}

if ($conn->connect_error) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Koneksi DB Gagal: " . $conn->connect_error]);
    exit();
}

$conn->set_charset("utf8mb4");

$ticketCode = 'NTL-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5));
$statusAttended = 0;
$createdAt = date('Y-m-d H:i:s');
$fullNameInput = trim($data->fullName);
$churchInput = trim($data->church);

$stmt = $conn->prepare("INSERT INTO NatalRegistration (ticketCode, fullName, church, statusAttended, createdAt) VALUES (?, ?, ?, ?, ?)");

if ($stmt) {
    $stmt->bind_param("sssis", $ticketCode, $fullNameInput, $churchInput, $statusAttended, $createdAt);
    
    if ($stmt->execute()) {
        ob_end_clean();
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "data" => [
                "ticketCode" => $ticketCode,
                "fullName"   => $fullNameInput,
                "church"     => $churchInput
            ]
        ]);
    } else {
        ob_end_clean();
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Gagal simpan data: " . $stmt->error]);
    }
    $stmt->close();
} else {
    ob_end_clean();
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare Query Gagal: " . $conn->error]);
}

$conn->close();
?>