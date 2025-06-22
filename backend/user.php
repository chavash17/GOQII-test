<?php
require 'db.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $result = $conn->query("SELECT id, name, email, dob FROM users WHERE id = $id");
            echo json_encode($result->fetch_assoc());
        } else {
            $result = $conn->query("SELECT id, name, email, dob FROM users");
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;

    case 'POST':
        $name = $conn->real_escape_string($input['name']);
        $email = $conn->real_escape_string($input['email']);
        $password = password_hash($input['password'], PASSWORD_DEFAULT);
        $dob = $conn->real_escape_string($input['dob']);

       // Check for duplicate emai
			$checkEmail = $conn->query("SELECT id FROM users WHERE email = '$email'");
			if ($checkEmail->num_rows > 0) {
				echo json_encode(["error" => "Email already exists"]);
				exit;
			}

		$query = "INSERT INTO users (name, email, password, dob) VALUES ('$name', '$email', '$password', '$dob')";

        if ($conn->query($query)) {
            echo json_encode(["message" => "User created successfully"]);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
        break;

    case 'PUT':
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $dob = $conn->real_escape_string($data['dob']);

    // Check for duplicate email for other users
    $checkEmail = $conn->query("SELECT id FROM users WHERE email = '$email' AND id != $id");
    if ($checkEmail->num_rows > 0) {
        echo json_encode(["error" => "Email already in use by another user"]);
        exit;
    }

    $query = "UPDATE users SET name='$name', email='$email', dob='$dob' WHERE id=$id";
    if ($conn->query($query)) {
        echo json_encode(["message" => "User updated"]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
    break;


    case 'DELETE':
        parse_str($_SERVER['QUERY_STRING'], $params);
        $id = intval($params['id']);
        $query = "DELETE FROM users WHERE id=$id";
        if ($conn->query($query)) {
            echo json_encode(["message" => "User deleted successfully"]);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
        break;

    default:
        echo json_encode(["error" => "Unsupported method"]);
        break;
}
?>
