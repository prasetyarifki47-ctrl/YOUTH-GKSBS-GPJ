<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// SESUAIKAN KREDENSIAL DENGAN CPANEL KAMU
$servername = "localhost";
$username   = "USERNAME_DB_CPANEL";
$password   = "PASSWORD_DB_CPANEL";
$dbname     = "NAMA_DB_CPANEL";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Koneksi database gagal."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->fullName) && !empty($data->church)) {
    // Generate kode tiket unik (contoh: NTL-8A2F9)
    $ticketCode = 'NTL-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5));
    
    // Sesuaikan nama tabel dan kolom di MySQL kamu
    $stmt = $conn->prepare("INSERT INTO peserta_natal (ticket_code, full_name, church, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->bind_param("sss", $ticketCode, $data->fullName, $data->church);
    
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "data" => [
                "ticketCode" => $ticketCode,
                "fullName" => $data->fullName,
                "church" => $data->church
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Gagal menyimpan data pendaftaran."]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Data tidak lengkap."]);
}

$conn->close();
?>