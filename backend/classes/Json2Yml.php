<?php
    class Json2Yml{
        public function setYmlFromJson(){
            $strJsonFileContents = file_get_contents($_SERVER['DOCUMENT_ROOT']."/data/spacex.json");
            $jasonArray = json_decode($strJsonFileContents, true);
            $ymlText = yaml_emit($jasonArray);
            $file = fopen($_SERVER['DOCUMENT_ROOT'].'/data/spacex.yml', 'w') or die("Can't create file");
            fwrite($file, $ymlText);
            fclose($file);
            echo "YML was created successfuly in $_SERVER[DOCUMENT_ROOT]/data/spacex.yml. ";
        }
    }