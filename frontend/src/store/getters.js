const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  username: state => state.user.username,
  userid: state => state.user.userid,
  roles: state => state.user.roles,
  is_superuser: state => state.user.is_superuser,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
}
export default getters
