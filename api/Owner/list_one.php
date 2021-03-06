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
        $owner->setAttr("oid", 
            isset($_GET["usrid"]) ? $_GET["usrid"] : die() 
        );
        // var_dump($_GET["usrid"]);
        // $ownerPageInfo = $owner->getPageInfo("pageSeq");
        // echo json_encode($ownerPageInfo);

        // Authorization
            // Create a session or resume current session based on session ID passed via POST
            session_start();

            // If the session variables aren't set, that means the user isn't logged in
            if (!isset($_SESSION['id']) || !isset($_SESSION['type'])) {
                session_destroy();
                echo json_encode(array('message' => 'User not logged in: You don\'t have permission to do that'));
                die();
            }

            // Make it so that an owner can only list his own entry.
            //   and a manager can list any entry.
            if ( !(($_SESSION['id'] === $owner->getAttr("oid")) ||
                    ($_SESSION['type'] === "manager")) ) {
                echo json_encode(array('message' => 'Incorrect authority: You don\'t have permission to do that'));
                die();
            }
            // If we've made it this far, the user is authorized to use this function

        // Get all rows from Owner table
        // It's an integer-indexed array of associative arrays
        $result = $owner->listOne();
        // $result = $owner->read();

        if (count($result) > 0) { // If there were any results
            // //Convert the result into JSON and output it
            echo json_encode($result);
        } else { // If there are not any entries in the Owner table
            echo json_encode( array("message" => "No Owners Found") );
        }
        // echo json_encode($_GET["usrid"]);
    } catch (PDOException $e) {
        echo json_encode( array("message" => $e->getMessage(),
                                "code" => (int)$e->getCode()) );
    }

    
    




