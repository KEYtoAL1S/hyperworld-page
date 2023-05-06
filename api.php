<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  if (isset($data['killer']) && isset($data['victim'])) {
    $koData = json_decode(file_get_contents('kos.json'), true);

    $koData[] = [
      'killer' => $data['killer'],
      'victim' => $data['victim'],
      'timestamp' => time(),
    ];

    file_put_contents('kos.json', json_encode($koData));

    echo json_encode([
      'status' => 'success',
    ]);
  } else {
    echo json_encode([
      'status' => 'error',
      'message' => 'Invalid data.',
    ]);
  }
} else {
  echo json_encode([
    'status' => 'error',
    'message' => 'Invalid request method.',
  ]);
}
