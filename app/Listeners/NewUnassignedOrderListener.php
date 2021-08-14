<?php

namespace App\Listeners;

use App\Events\OrderHasBeenPaidEvent;
use App\Mail\AdminToAssignMail;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NewUnassignedOrderListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  OrderHasBeenPaidEvent  $event
     * @return void
     */
    public function handle(OrderHasBeenPaidEvent $event)
    {
        //INFORM ADMIN TO ASSIGN
        $admin = User::where('role',0)->first();

        Mail::to($admin->email)->send(new AdminToAssignMail($admin->name,$event->order));

    }
}
