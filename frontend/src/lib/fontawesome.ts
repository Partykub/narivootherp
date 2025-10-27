// FontAwesome Configuration
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// Solid Icons (fas) - Only icons that actually exist
import {
  // Navigation & UI
  faHome,
  faTachometerAlt,
  faUser,
  faUsers,
  faUserGroup,
  faSearch,
  faFilter,
  faBars,
  faTimes,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAngleDown,
  
  // Actions
  faPlus,
  faMinus,
  faEdit,
  faPen,
  faPencil,
  faTrash,
  faTrashAlt,
  faSave,
  faDownload,
  faUpload,
  faCopy,
  faPrint,
  faShare,
  
  // Status & Feedback
  faCheck,
  faCheckCircle,
  faTimesCircle,
  faExclamation,
  faExclamationTriangle,
  faExclamationCircle,
  faInfo,
  faInfoCircle,
  faQuestion,
  faQuestionCircle,
  
  // Content & Media
  faImage,
  faImages,
  faFile,
  faFileText,
  faFileImage,
  faFilePdf,
  faFileExcel,
  faFileWord,
  faFolder,
  faFolderOpen,
  faVideo,
  faMusic,
  faCamera,
  
  // Communication
  faEnvelope,
  faPhone,
  faComment,
  faComments,
  faBell,
  
  // Settings & Configuration
  faCog,
  faTools,
  faWrench,
  faSliders,
  faAdjust,
  faToggleOn,
  faToggleOff,
  
  // Business & Finance
  faDollarSign,
  faCoins,
  faCreditCard,
  faWallet,
  faCalculator,
  faChartBar,
  faChartLine,
  faChartPie,
  
  // Time & Calendar
  faClock,
  faCalendar,
  faCalendarDays,
  faCalendarCheck,
  faStopwatch,
  faHistory,
  
  // Location & Map
  faMap,
  faMapMarkerAlt,
  faLocationDot,
  faGlobe,
  faCompass,
  
  // Shopping & E-commerce
  faShoppingCart,
  faShoppingBag,
  faStore,
  faTag,
  faTags,
  faBarcode,
  faReceipt,
  
  // Security & Privacy
  faLock,
  faUnlock,
  faKey,
  faShield,
  faEye,
  faEyeSlash,
  faFingerprint,
  
  // Technology
  faLaptop,
  faDesktop,
  faTablet,
  faMobile,
  faKeyboard,
  faMouse,
  faHeadphones,
  faWifi,
  
  // Transportation
  faCar,
  faTruck,
  faPlane,
  faShip,
  faTrain,
  faBicycle,
  faMotorcycle,
  
  // Weather & Nature
  faSun,
  faMoon,
  faCloud,
  faCloudRain,
  faSnowflake,
  faLeaf,
  faTree,
  
  // Sports & Activities
  faFootball,
  faBasketball,
  faTableTennis,
  faGamepad,
  faRunning,
  faSkiing,
  
  // Food & Dining
  faUtensils,
  faCoffee,
  faWineGlass,
  
  // Health & Medical
  faHeart,
  faHeartbeat,
  faMedkit,
  faPills,
  faStethoscope,
  faAmbulance,
  
  // Education & Learning
  faBook,
  faBookOpen,
  faGraduationCap,
  faSchool,
  faPencilRuler,
  
  // Misc Icons
  faStar,
  faFlag,
  faGift,
  faMagic,
  faRocket,
  faLightbulb,
  faPuzzlePiece,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons'

// Regular Icons (far)
import {
  faHeart as farHeart,
  faStar as farStar,
  faUser as farUser,
  faFile as farFile,
  faFolder as farFolder,
  faComment as farComment,
  faEnvelope as farEnvelope,
  faBell as farBell,
  faCalendar as farCalendar,
  faClock as farClock,
  faEye as farEye,
  faThumbsUp as farThumbsUp,
  faThumbsDown as farThumbsDown,
} from '@fortawesome/free-regular-svg-icons'

// Brand Icons (fab)
import {
  faGoogle,
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
  faYoutube,
  faTiktok,
  faLine,
  faApple,
  faMicrosoft,
  faAmazon,
  faReact,
  faNodeJs,
  faJs,
  faHtml5,
  faCss3,
  faPython,
  faPhp,
  faJava,
  faDocker,
  faGitAlt,
  faNpm,
  faYarn,
  faWordpress,
  faShopify,
} from '@fortawesome/free-brands-svg-icons'

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false

// Add icons to the library so they can be used throughout the application
library.add(
  // Solid Icons
  faHome, faTachometerAlt, faUser, faUsers, faUserGroup, faSearch, faFilter, faBars,
  faTimes, faArrowLeft, faArrowRight, faArrowUp, faArrowDown,
  faChevronLeft, faChevronRight, faChevronUp, faChevronDown,
  faAngleLeft, faAngleRight, faAngleUp, faAngleDown,
  faPlus, faMinus, faEdit, faPen, faPencil, faTrash, faTrashAlt, faSave,
  faDownload, faUpload, faCopy, faPrint, faShare,
  faCheck, faCheckCircle, faTimesCircle, faExclamation, faExclamationTriangle,
  faExclamationCircle, faInfo, faInfoCircle, faQuestion, faQuestionCircle,
  faImage, faImages, faFile, faFileText, faFileImage, faFilePdf, faFileExcel, faFileWord,
  faFolder, faFolderOpen, faVideo, faMusic, faCamera,
  faEnvelope, faPhone, faComment, faComments, faBell,
  faCog, faTools, faWrench, faSliders, faAdjust, faToggleOn, faToggleOff,
  faDollarSign, faCoins, faCreditCard, faWallet, faCalculator, faChartBar, faChartLine, faChartPie,
  faClock, faCalendar, faCalendarDays, faCalendarCheck, faStopwatch, faHistory,
  faMap, faMapMarkerAlt, faLocationDot, faGlobe, faCompass,
  faShoppingCart, faShoppingBag, faStore, faTag, faTags, faBarcode, faReceipt,
  faLock, faUnlock, faKey, faShield, faEye, faEyeSlash, faFingerprint,
  faLaptop, faDesktop, faTablet, faMobile, faKeyboard, faMouse, faHeadphones, faWifi,
  faCar, faTruck, faPlane, faShip, faTrain, faBicycle, faMotorcycle,
  faSun, faMoon, faCloud, faCloudRain, faSnowflake, faLeaf, faTree,
  faFootball, faBasketball, faTableTennis, faGamepad, faRunning, faSkiing,
  faUtensils, faCoffee, faWineGlass,
  faHeart, faHeartbeat, faMedkit, faPills, faStethoscope, faAmbulance,
  faBook, faBookOpen, faGraduationCap, faSchool, faPencilRuler,
  faStar, faFlag, faGift, faMagic, faRocket, faLightbulb, faPuzzlePiece, faThumbsUp, faThumbsDown,
  
  // Regular Icons
  farHeart, farStar, farUser, farFile, farFolder, farComment, farEnvelope, farBell,
  farCalendar, farClock, farEye, farThumbsUp, farThumbsDown,
  
  // Brand Icons
  faGoogle, faFacebook, faTwitter, faInstagram, faLinkedin, faGithub, faYoutube, faTiktok,
  faLine, faApple, faMicrosoft, faAmazon, faReact, faNodeJs, faJs, faHtml5, faCss3,
  faPython, faPhp, faJava, faDocker, faGitAlt, faNpm, faYarn, faWordpress, faShopify
)

export default library