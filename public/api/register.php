<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username   = "youthgk2_natal"; // Sesuaikan jika ada username khusus cPanel
$password   = "Mi4sanMi4"; // Isikan password DB cPanel kamu
$dbname     = "youthgk2_natal";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Koneksi database gagal: " . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->fullName) && !empty($data->church)) {
    $ticketCode = 'NTL-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5));
    $statusAttended = 0;
    
    // QUERY DISESUAIKAN DENGAN TABEL NatalRegistration
    $stmt = $conn->prepare("INSERT INTO NatalRegistration (ticketCode, fullName, church, statusAttended, createdAt) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("sssi", $ticketCode, $data->fullName, $data->church, $statusAttended);
    
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
        echo json_encode(["success" => false, "message" => "Gagal menyimpan data: " . $stmt->error]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Mohon lengkapi formulir pendaftaran."]);
}

$conn->close();
?>