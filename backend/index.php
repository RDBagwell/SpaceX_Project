<?php
    function setYmlFromJson(){
        $strJsonFileContents = file_get_contents("./data/spacex.json");
        $jasonArray = json_decode($strJsonFileContents, true);
        $ymlText = yaml_emit($jasonArray);
        $file = fopen('./data/spacex.yml', 'w') or die("Can't create file");
        fwrite($file, $ymlText);
        fclose($file);
    }

    function setCsvFromJson(){
        $file = "./data/spacex.json";
        $jsonContents = file_get_contents($file);
        $arrayContents = json_decode($jsonContents, true);
        $fcsv = fopen('./data/spacex.csv', 'w');
        $launchArray = [];
        foreach($arrayContents['data']['launches'] as $arr){
            $newArray = array(
                'id' => $arr['id'],
                'launch_date_local' => $arr['launch_date_local'],
                'site_name' => $arr['launch_site']['site_name'],
                'site_name_long' => $arr['launch_site']['site_name_long'],
                'launch_year' => $arr['launch_year'],
                'article_link' => $arr['links']['article_link'],
                'flickr_images' => implode(',', $arr['links']['flickr_images']),
                'mission_id' => implode(',', $arr['mission_id']),
                'mission_name' => $arr['mission_name'],
                'rocket_name' => $arr['rocket']['rocket_name'],
                'rocket_type' => $arr['rocket']['rocket_type']
            );
            $launchArray[] = $newArray;
        }
        $csv = '';
        $header = false;
        foreach ($launchArray as $line) {	
            if (empty($header)) {
                $header = array_keys($line);
                fputcsv($fcsv, $header);
                $csv .= implode(',', $header);
                $header = array_flip($header);		
            }
            
            $line_array = array();
            
            foreach($line as $value) {
                array_push($line_array, $value);
            }
            
            $csv .= "\n" . implode(',', $line_array);
        
            fputcsv($fcsv, $line_array);
        }
        fclose($fcsv);
    }

    setCsvFromJson();
?>