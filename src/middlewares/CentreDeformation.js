export default function CentreDeformationMiddleware(to, from, next) {
  const isIssetCentreDeformation = !!localStorage.getItem('centreDeFormation'); // or use Vuex/store
  if (isIssetCentreDeformation) {
    next(); // allow navigation
  } else {
    next('/CentresDeformation'); // redirect to CentresDeformation
  }
}
