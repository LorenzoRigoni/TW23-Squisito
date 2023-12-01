<?php
  require __DIR__ . '../../../vendor/autoload.php';

  /**
   * Function to push the notification.
   */
  function pushNotification() {

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
    
      $data['message'] = 'hello world';
      $pusher->trigger('my-channel', 'my-event', $data);

  }
?>
