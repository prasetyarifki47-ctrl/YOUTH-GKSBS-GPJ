<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// SESUAIKAN DENGAN KREDENSIAL DATABASE CPANEL KAMU
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

$method = $_SERVER['REQUEST_METHOD'];

// GET: Mengambil daftar seluruh peserta
if ($method === 'GET') {
    $result = $conn->query("SELECT id, ticket_code as ticketCode, full_name as fullName, church, created_at as createdAt FROM peserta_natal ORDER BY id DESC");
    $peserta = [];
    
    while ($row = $result->fetch_assoc()) {
        $peserta[] = $row;
    }
    
    echo json_encode(["success" => true, "data" => $peserta]);
}

// DELETE: Menghapus peserta berdasarkan ID
if ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->id)) {
        $stmt = $conn->prepare("DELETE FROM peserta_natal WHERE id = ?");
        $stmt->bind_param("i", $data->id);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Peserta berhasil dihapus."]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Gagal menghapus peserta."]);
        }
        $stmt->close();
    }
}

$conn->close();
?>