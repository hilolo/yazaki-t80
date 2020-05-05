<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use App\Cost;
use App\Indivcost;
use App\User;
use Response;
use Illuminate\Http\Request;
class CostsController extends Controller
{  
   public function data(){

  $cost = Cost::all();



  return Response::json(
    $cost->load('users')->load('indivcosts')->toArray()
  ,
      200
  );

}

public function bardashboard($year){

  $collection = collect([]);

    
  for($i = 1; $i <= 12; $i++){
  



  $cost = Cost::whereYear('date_week', '=', $year)->whereMonth('date_week', '=', $i)->get();
  $cost->load('users')->load('indivcosts');

  $q=0;
  foreach( $cost as $item)  {

    $q +=$item['indivcosts']->sum('amount');
  }
  $collection->push($q);
}

  return Response::json([
    'data' =>  $collection->all(),
    'label'  => 'Total Costs'
    ]
  ,
      200
  );
  

}


public function projetstats($year,$client){

  $collectionpsa = collect([]);

  for($i = 1; $i <= 12; $i++){
  $cost = Cost::whereYear('date_week', '=', $year)->whereMonth('date_week', '=', $i)->get();
  $cost->load('users')->load('indivcosts');

  $qpsa=0;
  foreach( $cost as $item)  {

    foreach( $item['indivcosts'] as $aq)  { 

      if( $aq['client']  == $client ){
      $qpsa +=$aq['amount'];}
  
    }


  }
 
  $collectionpsa->push($qpsa);

}

  return Response::json([
    'data' =>  $collectionpsa->all(),
    'label'  => $client,
    ]
  ,
      200
  );
  

}



public function piestats($year,$client){

  $collectionpsa = collect([]);


  $cost = Cost::whereYear('date_week', '=', $year)->get();
  $cost->load('users')->load('indivcosts');

  $qpsa=0;

  foreach( $cost as $item)  {

    foreach( $item['indivcosts'] as $aq)  { 

      if( $aq['client']  == $client ){
      $qpsa +=$aq['amount'];}


  
    }


  }
 



  return Response::json(
$qpsa
    
  ,
      200
  );
  

}





  public function insert(Request $request)
    {
    
    $iduser =  $request->all()[1]['user_id'];
    $date_week =  $request->all()[1]['date_week'];
      
  
        $cost = new Cost;

        $cost->date_week =$request->all()[1]['date_week'];
        $cost->user_id =  $request->all()[1]['user_id'];
        $cost->department =  $request->all()[1]['department'];
        $cost->save(); 

   
        foreach( $request->all()[0] as $item)  {
          
          $singlecost = new Indivcost;
          $singlecost->category=$item['category'];
          $singlecost->client=$item['client'];
          $singlecost->projet=$item['projet'];
          $singlecost->amount=$item['amount'];
          $singlecost->reason=$item['reason'];
          $singlecost->responsibility=$item['responsibility'];
          $singlecost->cost_id=$cost->id;
          $singlecost->save(); 

          
        }
      
         
      
        
        return response()->json([
            'success' => true
        ]);

    
  
      
    }




}

