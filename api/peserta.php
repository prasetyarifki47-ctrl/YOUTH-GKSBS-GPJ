<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username   = "youthgk2_natal";
$password   = "Mi4sanMi4";
$dbname     = "youthgk2_natal";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Koneksi database gagal"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT id, ticketCode, fullName, church, createdAt FROM NatalRegistration ORDER BY id DESC");
    $peserta = [];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $peserta[] = $row;
        }
        echo json_encode(["success" => true, "data" => $peserta]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Query Error: " . $conn->error]);
    }
}

if ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->id)) {
        $stmt = $conn->prepare("DELETE FROM NatalRegistration WHERE id = ?");
        $stmt->bind_param("i", $data->id);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Peserta berhasil dihapus."]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Gagal menghapus data."]);
        }
        $stmt->close();
    }
}

$conn->close();
?>