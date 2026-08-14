<?php
try {
    $pdo = new PDO('mysql:host=55wkyq.h.filess.io;port=3306;dbname=ohi_db_vesselsraw', 'ohi_db_vesselsraw', '36767599192cb303f740afa55acb42a057686727', [PDO::ATTR_TIMEOUT => 5]);
    echo 'OK';
} catch (Exception $e) {
    echo $e->getMessage();
}
