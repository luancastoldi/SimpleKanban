<?php

$localBD = "../bd.json";
$jsonConteudo = file_get_contents($localBD);

$start_column = $_GET['sc'];
$end_column = $_GET['ec'];
$card_index = $_GET['ci'];


if ($jsonConteudo) {
    $data = json_decode($jsonConteudo, true);
    var_dump($data['columns'][$start_column][$card_index]);
    // file_put_contents($this->localBD, json_encode($this->content, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK));
}



var_dump($_GET);
