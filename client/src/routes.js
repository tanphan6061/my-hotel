// admin hotel (own hotel)
import HotelEdit from 'pages/Admin/HotelEdit';
import HotelInfo from 'pages/Admin/HotelInfo';
import HotelLayout from 'pages/Admin/HotelLayout';
import AdminIndex from 'pages/Admin/Index';
import AdminLogin from 'pages/Admin/Login';
import RoomAdd from 'pages/Admin/RoomAdd';
import RoomEdit from 'pages/Admin/RoomEdit';
import RoomInfo from 'pages/Admin/RoomInfo';
import RoomLayout from 'pages/Admin/RoomLayout';
import RoomList from 'pages/Admin/RoomList';
import Booking from 'pages/Admin/Booking';
//home
import HomeIndex from 'pages/Home/Index';
import HomeLogin from 'pages/Home/Login';
import HomeRegister from 'pages/Home/Register';
import SearchHotel from 'pages/Home/SearchHotel';
import HomeVerify from 'pages/Home/Verify';
import DetailHotel from 'pages/Home/DetailHotel';
import EditInfo from 'pages/Home/EditInfo';
import History from 'pages/Home/HistoryTransaction';
import Checkout from 'pages/Home/Checkout';

// myhotel admin
import MyhotelLogin from 'pages/Myhotel/Login';
import UserList from 'pages/Myhotel/UserList';
import EquipmentList from 'pages/Myhotel/EquipmentList';

//  ================================== auth routes ==================================
export const AUTH_HOME_ROUTES = [
  {
    path: '/login',
    component: HomeLogin,
  },
  {
    path: '/register',
    component: HomeRegister,
  },
  {
    path: '/verify',
    component: HomeVerify,
  },
];

export const AUTH_ADMIN_ROUTES = [
  {
    path: '/admin/login',
    component: AdminLogin,
  },
];

export const AUTH_MYHOTEL_ROUTES = [
  {
    path: '/myhotel/login',
    component: MyhotelLogin,
  },
];

//  ================================== home routes ==================================
export const HOME_ROUTES = [
  {
    path: '/',
    component: HomeIndex,
  },
  {
    path: '/search',
    component: SearchHotel,
  },
  {
    path: '/hotel/:hotelId',
    component: DetailHotel,
  },
  {
    path: '/user/history',
    isAuthRequirePage: true,
    component: History,
  },
  {
    path: '/user/edit',
    isAuthRequirePage: true,
    component: EditInfo,
  },
  {
    path: '/checkout',
    isAuthRequirePage: true,
    component: Checkout,
  },
];

//  ================================== Admin routes ==================================
export const ADMIN_ROUTES = [
  // hotel routes
  {
    path: '/admin',
    isAuthRequirePage: true,
    component: AdminIndex,
  },
  {
    path: '/admin/hotel',
    isAuthRequirePage: true,
    component: AdminIndex,
  },
  {
    path: '/admin/hotel/:hotelId',
    isAuthRequirePage: true,
    exact: false,
    component: HotelLayout,
    /**
     *  lấy Hotel đang chọn từ Hotel Id sau đó truyền sang các page ở ADMIN_HOTEL_ROUTES thông qua HotelLayout
     * thay việc việc phảy lấy Hotel đang chọn mỗi page 1 lần ở các page ADMIN_HOTEL_ROUTES ta chỉ cần lấy ở Hotel Layout rồi truyền sang
     */
  },
];

export const ADMIN_HOTEL_ROUTES = [
  {
    path: '/admin/hotel/:hotelId/edit',
    isAuthRequirePage: true,
    component: HotelEdit,
  },
  {
    path: '/admin/hotel/:hotelId/booking',
    isAuthRequirePage: true,
    component: Booking,
  },
  {
    path: '/admin/hotel/:hotelId/room',
    isAuthRequirePage: true,
    component: RoomList,
  },
  {
    path: '/admin/hotel/:hotelId/room/add',
    isAuthRequirePage: true,
    component: RoomAdd,
  },
  {
    path: '/admin/hotel/:hotelId/room/:roomId',
    isAuthRequirePage: true,
    exact: false,
    component: RoomLayout,
    /**
     *  lấy ROOM đang chọn từ ROOM Id sau đó truyền sang các page ở ADMIN_ROOM_ROUTES thông qua ROOMLayout
     * thay việc việc phảy lấy ROOM đang chọn mỗi page 1 lần ở các page ADMIN_ROOM_ROUTES ta chỉ cần lấy ở ROOM Layout rồi truyền sang
     */
  },
  {
    path: '/admin/hotel/:hotelId/room/:roomId',
    isAuthRequirePage: true,
    component: RoomLayout,
    exact: false,
  },
  {
    path: '/admin/hotel/:hotelId',
    isAuthRequirePage: true,
    component: HotelInfo,
    exact: false,
  },
];

export const ADMIN_ROOM_ROUTES = [
  {
    path: '/admin/hotel/:hotelId/room/:roomId/edit',
    isAuthRequirePage: true,
    component: RoomEdit,
  },
  {
    path: '/admin/hotel/:hotelId/room/:roomId/info',
    isAuthRequirePage: true,
    component: RoomInfo,
    exact: false,
  },
];

//  ================================== MyHotel routes ==================================
export const MYHOTEL_ROUTES = [
  {
    path: '/myhotel',
    isAuthRequirePage: true,
    component: UserList,
  },
  {
    path: '/myhotel/user',
    isAuthRequirePage: true,
    component: UserList,
  },
  {
    path: '/myhotel/equipment',
    isAuthRequirePage: true,
    component: EquipmentList,
  },
];
