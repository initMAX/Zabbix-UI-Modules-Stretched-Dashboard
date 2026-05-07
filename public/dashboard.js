(() => {
    let bound = false;

    if (bound)
        return;

    bound = true;

    ZABBIX.Dashboard = null;
    let stretchedDashboard = null;
    let footer2 = 35;
    let baseDashboard = {};

    function fitScreen(dashboard) {
        let maxycell = 0;

        [...dashboard._dashboard_pages.keys()][0]._widgets.forEach((k, widget) => {
            maxycell = Math.max(maxycell, widget._pos.y + widget._pos.height)
        });

        let height = window.innerHeight - document.querySelector('.dashboard').getBoundingClientRect().top;

        if (!dashboard._is_kiosk_mode) {
            height -= footer2;
        }

        // cellheight = Math.max(height/maxycell, 70);
        cellheight = height/maxycell;

        if (cellheight <= 70) {
            return;
        }

        [...dashboard._dashboard_pages.keys()][0]._widgets.forEach((k, widget) => {
            widget._cell_height = cellheight;
            widget.setPos(widget.getPos());
        });
    }

    function setCellHeightDefault(dashboard) {
        let cellheight = 70;

        [...dashboard._dashboard_pages.keys()][0]._widgets.forEach((k, widget) => {
            widget._cell_height = cellheight;
            widget.setPos(widget.getPos());
        });
    }

    Object.defineProperty(ZABBIX, 'Dashboard', {
        set: prop => {
            stretchedDashboard = prop;
            baseDashboard.activate = prop.activate;
            baseDashboard.setEditMode = prop.setEditMode;

            stretchedDashboard.activate = () => {
                baseDashboard.activate.call(stretchedDashboard);
                fitScreen(stretchedDashboard);
            }

            stretchedDashboard.setEditMode = function () {
                setCellHeightDefault(stretchedDashboard);
                baseDashboard.setEditMode.apply(stretchedDashboard, arguments);
            }
        },
        get: () => stretchedDashboard
    });
})();
