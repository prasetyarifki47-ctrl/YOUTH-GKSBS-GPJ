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

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->ticketCode)) {
    $stmt = $conn->prepare("SELECT fullName, church, statusAttended FROM NatalRegistration WHERE ticketCode = ?");
    $stmt->bind_param("s", $data->ticketCode);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        // Update status absensi menjadi 1 (Sudah Hadir)
        $updateStmt = $conn->prepare("UPDATE NatalRegistration SET statusAttended = 1 WHERE ticketCode = ?");
        $updateStmt->bind_param("s", $data->ticketCode);
        $updateStmt->execute();
        $updateStmt->close();

        echo json_encode([
            "success" => true,
            "message" => "Tiket Valid & Absensi Berhasil ✅",
            "peserta" => [
                "fullName" => $row['fullName'],
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