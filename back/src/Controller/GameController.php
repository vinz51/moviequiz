<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GameController
{
  public function play(Request $request): Response
  {

    $hash = $request->attributes->get('hash');

    $response = new Response(json_encode([
      'message' => 'You will play the game soon, do not be so impatient! '.$hash
    ]));

    return $response;
  }

  public function result(Request $request): Response
  {
    $hash = $request->attributes->get('hash');

    $response = new Response(json_encode([
      'message' => 'The Joker is pretty sure that you will lose the game!'
    ]));

    return $response;
  }
}
