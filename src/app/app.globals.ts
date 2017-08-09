/**
 * ==============================
 * Contain all global variables for this application
 * ==============================
 */
'use strict';

export const SERVER_API_URl_PREFIX = 'http://localhost/VSCodeProjects/ProjectsTracker/server_side/web/app_dev.php';

export function formatDate(date): string {
  let d = new Date(date);
  let day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
  let m = d.getMonth() + 1;
  let month = (m < 10) ? '0' + m : m;
  return day + '/' + month + '/' + d.getFullYear();
}
