<?php

/**
 * Function to push the notification.
 * @param string $receiverEmail The email of the receiver user
 */
function pushNotification($receiverEmail) {
    require __DIR__ . '../../../vendor/autoload.php';

      $options = array(
        'cluster' => 'eu',
        'useTLS' => true
      );

      $pusher = new Pusher\Pusher(
        'a7d0c7ac2e467a01cd1b',
        '5c749c2d6c42c80a17c4',
        '1717839',
        $options
      );
      $pusher->trigger('my-channel', 'my-event', $receiverEmail);

  }
?>