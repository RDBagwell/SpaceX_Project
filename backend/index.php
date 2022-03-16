<?php
    spl_autoload_register(function ($class_name) {
        include 'classes/'.$class_name . '.php';
    });

    $yml = new Json2Yml();
    $yml->setYmlFromJson();

    $csv = new Json2CSV();
    $csv->setCsvFromJson();
?>