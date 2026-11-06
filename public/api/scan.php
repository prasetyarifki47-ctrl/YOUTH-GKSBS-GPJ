<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username   = "USERNAME_DB_CPANEL";
$password   = "PASSWORD_DB_CPANEL";
$dbname     = "NAMA_DB_CPANEL";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Koneksi database gagal"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->ticketCode)) {
    $stmt = $conn->prepare("SELECT full_name, church FROM peserta_natal WHERE ticket_code = ?");
    $stmt->bind_param("s", $data->ticketCode);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode([
            "success" => true,
            "message" => "Tiket Valid ✅",
            "peserta" => [
                "fullName" => $row['full_name'],
                "church"   => $row['church']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Tiket Tidak Ditemukan ❌"]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Kode tiket kosong"]);
}

$conn->close();
?>