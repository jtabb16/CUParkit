<?php
    /* Jack Tabb
     * 11/01/2018
    */

    // HTTP Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    // header('Access-Control-Allow-Methods: GET');

    // Include the database
    include_once '../../config/Database.php';

    // Include the data model that communicates to the database
    include_once '../../models/Owner.php';

    // Instantiate DB & connect to it
    try {
        $database = new Database();
        $db = $database->connect();
        // Instantiate an Owner object
        $owner = new Owner($db);

        // Get OID from front-end
        $owner->setPageInfo("pageSeq", 
            isset($_GET["pageNum"]) ? $_GET["pageNum"] : 1 
        );
        // var_dump($_GET["pageNumber"]);
        // $ownerPageInfo = $owner->getPageInfo("pageSeq");
        // echo json_encode($ownerPageInfo);

        // Get all rows from Owner table
        // It's an integer-indexed array of associative arrays
        $result = $owner->listAll();
        // $result = $owner->read();

        if (count($result) > 0) { // If there were any results
            // Convert the result into JSON and output it
            echo json_encode($result);
        } else { // If there are not any entries in the Owner table
            echo json_encode( array("message" => "No Owners Found") );
        }
    } catch (PDOException $e) {
        echo json_encode( array("message" => $e->getMessage(),
                                "code" => (int)$e->getCode()) );
    }

    
    




