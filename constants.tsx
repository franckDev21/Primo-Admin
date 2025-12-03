import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Settings, 
  FileAudio,
  Activity
} from 'lucide-react';
import { TCFModule, User, Transaction, Question, SubscriptionPlan } from './types';

export const NAV_ITEMS = [
  { label: 'Tableau de bord', icon: <LayoutDashboard size={20} />, path: '/' },
  { label: 'Gestion Contenu', icon: <BookOpen size={20} />, path: '/content' },
  { label: 'Utilisateurs', icon: <Users size={20} />, path: '/users' },
  { label: 'Finance & Abos', icon: <CreditCard size={20} />, path: '/finance' },
  { label: 'Médiathèque', icon: <FileAudio size={20} />, path: '/media' },
  { label: 'Logs & Système', icon: <Activity size={20} />, path: '/logs' },
  { label: 'Paramètres', icon: <Settings size={20} />, path: '/settings' },
];

export const MOCK_MODULES: TCFModule[] = [
  { id: '1', name: 'Compréhension Orale', code: 'CO', description: 'Écoute et analyse audio', questionCount: 39, durationMinutes: 35 },
  { id: '2', name: 'Compréhension Écrite', code: 'CE', description: 'Lecture et textes à trous', questionCount: 39, durationMinutes: 60 },
  { id: '3', name: 'Expression Écrite', code: 'EE', description: 'Rédaction de tâches', questionCount: 3, durationMinutes: 60 },
  { id: '4', name: 'Expression Orale', code: 'EO', description: 'Entretien individuel', questionCount: 3, durationMinutes: 12 },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Jean Dupont', email: 'jean.d@example.com', status: 'active', subscription: 'monthly', lastLogin: '2023-10-25', progress: 65 },
  { id: 'u2', name: 'Marie Curie', email: 'm.curie@science.fr', status: 'active', subscription: 'annual', lastLogin: '2023-10-24', progress: 88 },
  { id: 'u3', name: 'Ousmane Dembélé', email: 'ousmane@foot.com', status: 'inactive', subscription: 'free', lastLogin: '2023-10-20', progress: 12 },
  { id: 'u4', name: 'Sophie Marceau', email: 'sophie@actor.fr', status: 'banned', subscription: 'free', lastLogin: '2023-09-15', progress: 45 },
  { id: 'u5', name: 'Victor Hugo', email: 'v.hugo@lesmis.fr', status: 'active', subscription: 'weekly', lastLogin: '2023-10-26', progress: 30 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx_1', userId: 'u1', userName: 'Jean Dupont', amount: 15000, currency: 'XOF', date: '2023-10-25', status: 'success', method: 'OM' },
  { id: 'tx_2', userId: 'u5', userName: 'Victor Hugo', amount: 5000, currency: 'XOF', date: '2023-10-24', status: 'success', method: 'MOMO' },
  { id: 'tx_3', userId: 'u3', userName: 'Ousmane Dembélé', amount: 5000, currency: 'XOF', date: '2023-10-23', status: 'failed', method: 'VISA' },
  { id: 'tx_4', userId: 'u2', userName: 'Marie Curie', amount: 45000, currency: 'XOF', date: '2023-10-20', status: 'success', method: 'VISA' },
];

export const MOCK_QUESTIONS: Question[] = [
  { id: 'q1', text: 'Quelle est l\'intention de l\'auteur ?', moduleId: 'CE', difficulty: 4, type: 'QCM', points: 15 },
  { id: 'q2', text: 'Complétez la phrase suivante...', moduleId: 'CE', difficulty: 2, type: 'QCM', points: 9 },
  { id: 'q3', text: 'Écoutez le dialogue. Où se passe la scène ?', moduleId: 'CO', difficulty: 3, type: 'AUDIO', points: 9 },
  { id: 'q4', text: 'Décrivez cette image.', moduleId: 'EO', difficulty: 1, type: 'IMAGE', points: 3 },
  { id: 'q5', text: 'Rédigez un courriel de réclamation.', moduleId: 'EE', difficulty: 5, type: 'QCM', points: 26 },
];

export const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_1',
    name: 'Découverte (24h)',
    price: 1500,
    currency: 'CFA',
    duration: 'daily',
    features: ['Accès 24h complet', '1 Examen blanc', 'Correction instantanée', 'Sans engagement'],
    active: true,
    highlight: false
  },
  {
    id: 'plan_2',
    name: 'Intensif Hebdo',
    price: 5000,
    currency: 'CFA',
    duration: 'weekly',
    features: ['Accès 7 jours', 'Examens illimités', 'Statistiques détaillées', 'Support prioritaire'],
    active: true,
    highlight: true
  },
  {
    id: 'plan_3',
    name: 'Maîtrise Mensuelle',
    price: 15000,
    currency: 'CFA',
    duration: 'monthly',
    features: ['Accès 30 jours', 'Mode entraînement ciblé', 'Tous les modules', 'Garantie réussite', 'Certificat blanc'],
    active: true,
    highlight: false
  },
];

export const CHART_DATA_REVENUE = [
  { name: 'Lun', value: 40000 },
  { name: 'Mar', value: 30000 },
  { name: 'Mer', value: 55000 },
  { name: 'Jeu', value: 45000 },
  { name: 'Ven', value: 80000 },
  { name: 'Sam', value: 65000 },
  { name: 'Dim', value: 95000 },
];

export const CHART_DATA_ACTIVITY = [
  { name: 'CE', users: 120 },
  { name: 'CO', users: 98 },
  { name: 'EE', users: 45 },
  { name: 'EO', users: 30 },
];