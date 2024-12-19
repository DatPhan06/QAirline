from .user import User, UserCreate, UserUpdate, PasswordChangeRequest
from .flight import Flight, FlightCreate 
from .booked_tiket import BookedTicketBase, BookedTicketCreate, BookedTicketUpdate, BookedTicket, BookingStats, BookingStatsOverview
from .airport import AirportBase, AirportCreate, Airport
from .tiket import TicketBase, TicketCreate, TicketUpdate, Ticket
from .seat import SeatBase, SeatCreate, SeatUpdate, Seat
from .general_info import GeneralInfo, GeneralInfoBase, GeneralInfoCreate, GeneralInfoUpdate
from .news import NewsBase, NewsCreate, News
from .notification import NotificationBase, NotificationCreate, Notification
from .promotion import PromotionBase, PromotionCreate, Promotion
from .flight_log import FlightLogBase, FlightLogCreate, FlightLog
from .admin import AdminBase, AdminCreate, AdminUpdate, Admin
from .airplane import AirplaneBase, AirplaneCreate, Airplane