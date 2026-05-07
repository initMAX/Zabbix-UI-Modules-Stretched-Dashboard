<?php

namespace Modules\StretchedDashboard;

use CController as CAction;
use Core\CModule as ModuleBase;

class Module extends ModuleBase
{
    public function onBeforeAction(CAction $action): void
    {
        if ($action->getAction() == 'dashboard.view') {
            zbx_add_post_js(file_get_contents(__DIR__ . '/public/dashboard.js'));
        }
    }
}
