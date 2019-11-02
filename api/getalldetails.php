<?php
session_start();
require_once('credenials.php');

    $body = file_get_contents("php://input");
    $json = json_decode(json_encode($body), true);
    $arr = json_decode($json);
    $arr = (array) $arr;

   //validations
    if (empty($arr['fromDate'])) {
        $arr['fromDate'] = date("Y-m-d");
    }
    if (empty($arr['toDate'])) {
        $arr['toDate'] = date("Y-m-d");
    }

    if (empty($arr['pan'])) {
        $arr['pan'] = "''";
    }
    if ($arr['toDate'] != '' && DateTime::createFromFormat('Y-m-d', $arr['toDate']) == FALSE ) {
        die('{"ERROR": "Date is not in correct format YYYY-MM-DD - '. $arr['toDate'].'"}' );
    }
    if ($arr['fromDate'] != '' && DateTime::createFromFormat('Y-m-d', $arr['fromDate']) == FALSE ) {
        die('{"ERROR": "Date is not in correct format YYYY-MM-DD - '. $arr['fromDate'].'"}' );
    }
    if (empty($arr['minEffort'])) {
        $arr['minEffort'] = 0;
    }
     if (empty($arr['maxEffort'])) {
        $arr['maxEffort'] = 1000;
    }

    if ( ((int)$arr['minEffort'] === $arr['minEffort'] && (int)$arr['minEffort'] < 0) || ((int)$arr['maxEffort'] == $arr['maxEffort'] && (int)$arr['maxEffort'] < 0))    {
         die('{"ERROR": "counter is not valid integer min - '. $arr['minEffort'] . " max - ". $arr['maxEffort'] .'"}' );
    }
    if (empty($arr['methodName'])) {
        die('{"ERROR"}: "methodName cannot be empty. Possible values are: getBin, getPan, getAll, getBySession"');
    }

  //validations



switch ($arr['methodName']) {
    case 'getBin':
        $conn = new mysqli($servername, $username, $password, $dbname);
    if ( empty($arr['bin'])) {
    die('{"ERROR"}: "bin is empty"');
    }
// Check connection
    if ($conn->connect_error) {
        die(json_encode("Connection failed: " . $conn->connect_error));
    }
    $sql = "SELECT ID, phpsessionid, cardnumber, bin, pan, counter, REMOTE_ADDR FROM data WHERE (DATE(DateCreated) BETWEEN '". $arr['fromDate'] ."' AND '". $arr['toDate']."') AND bin = ".$arr['bin']." AND ( counter > ". (int)$arr['minEffort']. " AND counter < " . (int)$arr['maxEffort']. ")";

    #var_dump($sql); die();
    if (!mysqli_query($conn, $sql)) {
         die(json_encode("Error: " . mysqli_error($conn)));
    }
    $result = $conn->query($sql);
    $r = array();
    if ($result->num_rows > 0) {

        // output data of each row
        foreach ($result as $key => $value) {
            $r[$key] = $value;
        }

        print_r ( json_encode( (object)$r ) ) ;

    } else {
        echo '{"Results" : "0"}';
    };

    mysqli_close($conn);

        break;

    case 'getPan':
        $conn = new mysqli($servername, $username, $password, $dbname);
    if ( empty($arr['pan'])) {
    die('{"ERROR"}: "pan is empty"');
    }
// Check connection
    if ($conn->connect_error) {
        die(json_encode("Connection failed: " . $conn->connect_error));
    }
    $sql = "SELECT ID, phpsessionid, cardnumber, bin, pan, counter, REMOTE_ADDR FROM data WHERE (DATE(DateCreated) BETWEEN '". $arr['fromDate'] ."' AND '". $arr['toDate']."') AND pan = ".$arr['pan']." AND ( counter > ". (int)$arr['minEffort']. " AND counter < " . (int)$arr['maxEffort']. ")";

    #var_dump($sql); die();
    if (!mysqli_query($conn, $sql)) {
         die(json_encode("Error: " . mysqli_error($conn)));
    }
    $result = $conn->query($sql);
    $r = array();
    if ($result->num_rows > 0) {

        // output data of each row
        foreach ($result as $key => $value) {
            $r[$key] = $value;
        }

        print_r ( json_encode($r) ) ;

    } else {
        echo '{"Results" : "0"}';
    };

    mysqli_close($conn);

        break;
    case 'getAll':
        $conn = new mysqli($servername, $username, $password, $dbname);
    if ( empty($arr['pan'])) {
    die('{"ERROR"}: "pan is empty"');
    }
// Check connection
    if ($conn->connect_error) {
        die(json_encode("Connection failed: " . $conn->connect_error));
    }
    $sql = "SELECT ID, phpsessionid, cardnumber, bin, pan, counter, REMOTE_ADDR FROM data WHERE (DATE(DateCreated) BETWEEN '". $arr['fromDate'] ."' AND '". $arr['toDate']."')  AND ( counter > ". (int)$arr['minEffort']. " AND counter < " . (int)$arr['maxEffort']. ")";

    #var_dump($sql); die();
    if (!mysqli_query($conn, $sql)) {
         die(json_encode("Error: " . mysqli_error($conn)));
    }
    $result = $conn->query($sql);
    $r = array();
    if ($result->num_rows > 0) {

        // output data of each row
        foreach ($result as $key => $value) {
            $r[$key] = $value;
        }

        print_r ( json_encode($r) ) ;

    } else {
        echo '{"Results" : "0"}';
    };

    mysqli_close($conn);
        break;
    case 'getBySession':
        $conn = new mysqli($servername, $username, $password, $dbname);
    if ( empty($arr['session'])) {
    die('{"ERROR"}: "session is empty"');
    }
// Check connection
    if ($conn->connect_error) {
        die(json_encode("Connection failed: " . $conn->connect_error));
    }
    $sql = "SELECT ID, phpsessionid, cardnumber, bin, pan, counter, REMOTE_ADDR FROM data WHERE (DATE(DateCreated) BETWEEN '". $arr['fromDate'] ."' AND '". $arr['toDate']."')  AND ( counter > ". (int)$arr['minEffort']. " AND counter < " . (int)$arr['maxEffort']. ") AND phpsessionid = '". $arr['session']. "'";

    #var_dump($sql); die();
    if (!mysqli_query($conn, $sql)) {
         die(json_encode("Error: " . mysqli_error($conn)));
    }
    $result = $conn->query($sql);
    $r = array();
    if ($result->num_rows > 0) {

        // output data of each row
        foreach ($result as $key => $value) {
            $r[$key] = $value;
        }

        print_r ( json_encode($r) ) ;

    } else {
        echo '{"Results" : "0"}';
    };

    mysqli_close($conn);
        break;
    default:
            die('{"ERROR"}: "methodName cannot be empty. Possible values are: getBin, getPan, getAll, getBySession"');
        break;
}


 ?>
