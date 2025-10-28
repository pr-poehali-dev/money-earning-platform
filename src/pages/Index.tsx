import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [phone, setPhone] = useState('');
  const [bank, setBank] = useState('');
  const [referralId, setReferralId] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');
  const [showReferralCard, setShowReferralCard] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [earningsHistory, setEarningsHistory] = useState<number[]>([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [balance, setBalance] = useState(0);
  const [hasCard, setHasCard] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('card');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refId = params.get('ref');
    if (refId) {
      localStorage.setItem('referral_id', refId);
      toast.success(`Вы перешли по реферальной ссылке! Вы получите 500₽, а ваш друг ${refId} получит 200₽!`);
    }

    const savedName = localStorage.getItem('user_name');
    const savedEmail = localStorage.getItem('user_email');
    const savedBalance = parseInt(localStorage.getItem('user_balance') || '0');
    const savedHasCard = localStorage.getItem('has_card') === 'true';
    
    if (savedName && savedEmail) {
      setIsRegistered(true);
      setUserName(savedName);
      setUserEmail(savedEmail);
      setBalance(savedBalance);
      setHasCard(savedHasCard);
    }

    const savedReferralId = localStorage.getItem('my_referral_id');
    const savedCount = parseInt(localStorage.getItem('referral_count') || '0');
    const savedEarnings = parseInt(localStorage.getItem('total_earnings') || '0');
    
    if (savedReferralId) {
      setReferralId(savedReferralId);
      setReferralLink(`${window.location.origin}/?ref=${savedReferralId}`);
      setShowReferralCard(true);
      setReferralCount(savedCount);
      setTotalEarnings(savedEarnings);
      
      const savedHistory = localStorage.getItem('earnings_history');
      if (savedHistory) {
        setEarningsHistory(JSON.parse(savedHistory));
      }
    }
  }, []);

  const generateReferralLink = () => {
    const newId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferralId(newId);
    const link = `${window.location.origin}/?ref=${newId}`;
    setReferralLink(link);
    setShowReferralCard(true);
    
    localStorage.setItem('my_referral_id', newId);
    
    createCoinAnimation();
    playSound('success');
    toast.success('Реферальная ссылка создана! Делитесь с друзьями!');
  };

  const playSound = (type: 'coin' | 'success') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'coin') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  const simulateReferral = () => {
    if (!isRegistered) {
      toast.error('Сначала зарегистрируйтесь!');
      return;
    }
    const newCount = referralCount + 1;
    const newEarnings = totalEarnings + 200;
    const newBalance = balance + 200;
    setReferralCount(newCount);
    setTotalEarnings(newEarnings);
    setBalance(newBalance);
    localStorage.setItem('user_balance', newBalance.toString());
    
    const newHistory = [...earningsHistory, newEarnings];
    setEarningsHistory(newHistory);
    
    localStorage.setItem('referral_count', newCount.toString());
    localStorage.setItem('total_earnings', newEarnings.toString());
    localStorage.setItem('earnings_history', JSON.stringify(newHistory));
    
    createCoinAnimation();
    playSound('coin');
    toast.success(`🎉 Новый реферал! +200₽ к заработку!`);
  };

  const createCoinAnimation = () => {
    const container = document.getElementById('coin-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.textContent = '🪙';
        coin.style.left = `${Math.random() * 100}%`;
        coin.style.animationDuration = `${2 + Math.random() * 2}s`;
        coin.style.animationDelay = `${Math.random() * 0.5}s`;
        container.appendChild(coin);

        setTimeout(() => {
          coin.remove();
        }, 4000);
      }, i * 100);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Ссылка скопирована в буфер обмена!');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) {
      toast.error('Заполните все поля регистрации');
      return;
    }
    localStorage.setItem('user_name', userName);
    localStorage.setItem('user_email', userEmail);
    localStorage.setItem('user_balance', '0');
    setIsRegistered(true);
    setBalance(0);
    toast.success('🎉 Регистрация успешна! Теперь вы можете зарабатывать!');
  };

  const handleOrderCard = () => {
    if (!isRegistered) {
      toast.error('Сначала зарегистрируйтесь!');
      return;
    }
    setHasCard(true);
    localStorage.setItem('has_card', 'true');
    toast.success('🎉 Заявка на карту отправлена! Карта будет доставлена в течение 7 дней.');
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error('Введите корректную сумму');
      return;
    }
    const amount = parseFloat(withdrawAmount);
    if (amount > balance) {
      toast.error('Недостаточно средств на балансе');
      return;
    }
    if (amount < 500) {
      toast.error('Минимальная сумма вывода: 500₽');
      return;
    }
    setBalance(balance - amount);
    localStorage.setItem('user_balance', (balance - amount).toString());
    setShowWithdrawModal(false);
    setWithdrawAmount('');
    toast.success(`Заявка на вывод ${amount}₽ принята! Деньги поступят в течение 1-3 дней.`);
  };

  const handleSubmitReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptFile || !phone || !bank) {
      toast.error('Заполните все поля');
      return;
    }
    const storedRefId = localStorage.getItem('referral_id');
    const message = storedRefId 
      ? `Чек отправлен на проверку! Вы получите 500₽, а пользователь ${storedRefId} получит 200₽ за приглашение!`
      : 'Чек отправлен на проверку! Мы свяжемся с вами в ближайшее время.';
    toast.success(message);
    setReceiptFile(null);
    setPhone('');
    setBank('');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 relative">
      <div id="coin-container" className="fixed inset-0 pointer-events-none z-50 overflow-hidden"></div>
      
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                БонусПро
              </span>
            </div>
            <div className="flex items-center gap-6">
              {isRegistered && (
                <div className="flex items-center gap-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-6 py-3 rounded-full border-2 border-green-500/30">
                  <Icon name="Wallet" size={24} className="text-green-600" />
                  <span className="text-xl font-extrabold text-green-700">{balance}₽</span>
                </div>
              )}
              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => scrollToSection('how')} className="text-sm font-semibold hover:text-primary transition-colors">
                  Как получить
                </button>
                <button onClick={() => scrollToSection('referral')} className="text-sm font-semibold hover:text-primary transition-colors">
                  Партнёрка
                </button>
                {isRegistered && (
                  <button onClick={() => scrollToSection('withdraw')} className="text-sm font-semibold hover:text-primary transition-colors">
                    Вывод
                  </button>
                )}
                <button onClick={() => scrollToSection('faq')} className="text-sm font-semibold hover:text-primary transition-colors">
                  FAQ
                </button>
                <button onClick={() => scrollToSection('contacts')} className="text-sm font-semibold hover:text-primary transition-colors">
                  Контакты
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-6 py-3 mb-6">
              <p className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2 justify-center">
                <Icon name="Zap" size={18} />
                Ограниченное предложение
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent leading-tight">
              Получи 1000₽ прямо сейчас! 💸
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 font-semibold">
              500₽ от нас + 500₽ от Альфа-Банка
            </p>
            <p className="text-base text-gray-600 mb-12 max-w-2xl mx-auto">
              Оформи бесплатную карту Альфа-Банка, получи 1000₽ на счёт и начни зарабатывать ещё больше через реферальную программу!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <div className="bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl p-8 shadow-2xl animate-pulse-glow relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-white/20 rounded-full px-3 py-1 text-xs font-bold">
                  ЗА РЕГИСТРАЦИЮ
                </div>
                <div className="text-6xl font-extrabold mb-2">500₽</div>
                <div className="text-lg font-semibold">От БонусПро</div>
              </div>
              <div className="text-4xl text-gray-400 font-bold">+</div>
              <div className="bg-gradient-to-br from-accent to-orange-600 text-white rounded-2xl p-8 shadow-2xl animate-pulse-glow relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-white/20 rounded-full px-3 py-1 text-xs font-bold">
                  ОТ БАНКА
                </div>
                <div className="text-6xl font-extrabold mb-2">500₽</div>
                <div className="text-lg font-semibold">От Альфа-Банка</div>
              </div>
              <div className="text-4xl text-gray-400 font-bold hidden md:block">=</div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl animate-scale-in">
                <div className="text-6xl font-extrabold mb-2">1000₽</div>
                <div className="text-lg font-semibold">Твой бонус!</div>
              </div>
            </div>
            {!isRegistered ? (
              <div className="mb-12 max-w-md mx-auto">
                <Card className="p-8 border-4 border-primary/40 shadow-2xl">
                  <h3 className="text-2xl font-bold text-center mb-6">Регистрация для заработка</h3>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-base font-semibold">Имя</Label>
                      <Input 
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Введите ваше имя"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="h-12 text-base"
                      />
                    </div>
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent"
                    >
                      <Icon name="UserPlus" size={24} className="mr-2" />
                      Зарегистрироваться
                    </Button>
                  </form>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {!hasCard ? (
                    <Button 
                      size="lg" 
                      className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-xl hover:shadow-2xl animate-scale-in w-full sm:w-auto"
                      onClick={handleOrderCard}
                    >
                      <Icon name="CreditCard" size={28} className="mr-3" />
                      Оформить карту
                    </Button>
                  ) : (
                    <div className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3">
                      <Icon name="CheckCircle2" size={28} />
                      Карта оформлена!
                    </div>
                  )}
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-xl px-12 py-8 rounded-2xl border-4 border-green-500/40 hover:bg-green-500/10 w-full sm:w-auto font-bold"
                    onClick={() => setShowWithdrawModal(true)}
                  >
                    <Icon name="Wallet" size={28} className="mr-3" />
                    Вывести деньги
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    variant="outline"
                    className="text-base px-8 py-4"
                    onClick={() => scrollToSection('how')}
                  >
                    Как получить бонус
                  </Button>
                  <Button 
                    variant="outline"
                    className="text-base px-8 py-4"
                    onClick={() => scrollToSection('referral')}
                  >
                    Партнёрка
                  </Button>
                </div>
              </div>
            )}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-green-500" />
                <span>Безопасно</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={20} className="text-blue-500" />
                <span>Быстрый вывод</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={20} className="text-purple-500" />
                <span>Проверено</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Как получить 1000₽?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all border-2 border-purple-100 hover:border-primary">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-white text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Оформи карту</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Перейди по ссылке{' '}
                <a 
                  href="https://alfa.me/ASQWHN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary font-semibold underline hover:text-accent transition-colors"
                >
                  alfa.me/ASQWHN
                </a>
                {' '}и оформи Альфа-Карту с бесплатным обслуживанием
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all border-2 border-purple-100 hover:border-primary">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-white text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Активируй и купи</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Активируй карту в мобильном приложении Альфа-Банка и соверши любую покупку от 200₽
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all border-2 border-purple-100 hover:border-primary">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-white text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Отправь чек</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Отправь скриншот чека в{' '}
                <a 
                  href="https://t.me/Alfa_Bank778" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary font-semibold underline hover:text-accent transition-colors"
                >
                  Telegram @Alfa_Bank778
                </a>
                {' '}и получи свои 500₽!
              </p>
            </Card>
          </div>

          <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-6 text-center">📤 Отправить чек на проверку</h3>
            <form onSubmit={handleSubmitReceipt} className="max-w-md mx-auto space-y-4">
              <div>
                <Label htmlFor="receipt" className="text-base font-semibold">Скриншот чека</Label>
                <Input
                  id="receipt"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-base font-semibold">Номер телефона для СБП</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bank" className="text-base font-semibold">Ваш банк для вывода</Label>
                <Input
                  id="bank"
                  type="text"
                  placeholder="Например: Сбербанк"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>
              <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить на проверку
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section id="referral" className="py-16 px-4 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Партнёрская программа 🤝
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12 font-semibold">
            Приглашай друзей и получай по 200₽ за каждого!
          </p>

          {!showReferralCard && (
            <div className="text-center mb-12">
              <Button 
                size="lg" 
                onClick={generateReferralLink}
                className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-xl hover:shadow-2xl animate-scale-in"
              >
                <Icon name="Gift" size={28} className="mr-3" />
                Получить реферальную ссылку
              </Button>
              <p className="text-gray-600 mt-4 text-sm">
                Нажми, чтобы создать свою уникальную ссылку для друзей
              </p>
            </div>
          )}

          {showReferralCard && (
            <Card className="p-10 mb-12 border-4 border-accent/40 bg-gradient-to-br from-white to-accent/5 animate-scale-in shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-accent to-orange-600 rounded-3xl mb-6 animate-pulse-glow shadow-xl">
                  <Icon name="Link" size={56} className="text-white" />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">Твоя реферальная ссылка готова! 🎉</h3>
                <p className="text-xl text-gray-700 mb-8 font-semibold">
                  Делись с друзьями и получай 200₽ за каждого!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-10 text-white text-center shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  <Icon name="Users" size={40} className="mx-auto mb-3 opacity-80" />
                  <div className="text-6xl md:text-7xl font-extrabold mb-3">{referralCount}</div>
                  <div className="text-lg font-bold opacity-90">Рефералов</div>
                </div>
                <div className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl p-10 text-white text-center shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  <Icon name="Wallet" size={40} className="mx-auto mb-3 opacity-80" />
                  <div className="text-6xl md:text-7xl font-extrabold mb-3">{totalEarnings}₽</div>
                  <div className="text-lg font-bold opacity-90">Заработано</div>
                </div>
              </div>

              {earningsHistory.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-4 border-blue-300 shadow-xl">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Icon name="TrendingUp" size={36} className="text-blue-600" />
                    <h4 className="text-2xl md:text-3xl font-extrabold text-gray-900">📈 График роста заработка</h4>
                  </div>
                  <div className="relative h-64 md:h-80 flex items-end gap-3 bg-white rounded-xl p-6 shadow-inner">
                    {earningsHistory.map((earning, index) => {
                      const maxEarning = Math.max(...earningsHistory);
                      const height = (earning / maxEarning) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="text-base md:text-lg font-extrabold text-primary bg-white px-2 py-1 rounded-lg shadow-md">{earning}₽</div>
                          <div 
                            className="w-full bg-gradient-to-t from-primary via-purple-500 to-accent rounded-t-xl transition-all duration-500 hover:opacity-80 hover:scale-105 shadow-lg cursor-pointer"
                            style={{ height: `${height}%`, minHeight: '40px' }}
                          />
                          <div className="text-sm md:text-base font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{index + 1}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center mt-6 text-lg font-bold text-gray-700 bg-white py-3 rounded-xl shadow-md">
                    💰 Рост заработка по рефералам
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-2xl p-6 mb-8 border-4 border-dashed border-primary/40 shadow-xl">
                <p className="text-lg text-gray-700 mb-4 font-bold flex items-center gap-2">
                  <Icon name="Link2" size={24} className="text-primary" />
                  Твоя реферальная ссылка:
                </p>
                <div className="flex items-center gap-3">
                  <Input 
                    value={referralLink} 
                    readOnly 
                    className="font-mono text-base md:text-lg bg-gray-50 border-2 border-primary/20 h-14"
                  />
                  <Button onClick={copyReferralLink} size="lg" className="flex-shrink-0 bg-gradient-to-r from-primary to-accent h-14 px-6">
                    <Icon name="Copy" size={24} />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-4 border-green-300 shadow-xl">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Icon name="CircleDollarSign" size={48} className="text-green-600" />
                  <h4 className="text-2xl md:text-3xl font-extrabold text-green-900">💡 Как это работает?</h4>
                </div>
                <ol className="space-y-5 text-lg">
                  <li className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <span className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">1</span>
                    <span className="font-semibold text-gray-800">Отправь эту ссылку другу в WhatsApp, Telegram или соцсетях</span>
                  </li>
                  <li className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <span className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">2</span>
                    <span className="font-semibold text-gray-800">Друг оформляет карту по твоей ссылке и выполняет условия</span>
                  </li>
                  <li className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <span className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">3</span>
                    <span className="font-bold text-green-700 text-xl">Ты получаешь 200₽ 🎉 после проверки чека друга!</span>
                  </li>
                </ol>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={generateReferralLink}
                  variant="outline"
                  size="lg"
                  className="border-4 border-primary/40 hover:bg-primary/10 text-lg py-7 px-8 font-bold"
                >
                  <Icon name="RefreshCw" size={24} className="mr-3" />
                  Создать новую ссылку
                </Button>
                <Button 
                  onClick={simulateReferral}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-lg py-7 px-8 font-bold shadow-xl hover:shadow-2xl"
                >
                  <Icon name="UserPlus" size={24} className="mr-3" />
                  Тест: +1 реферал
                </Button>
              </div>
            </Card>
          )}
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-2 border-primary/20 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
                  <Icon name="Users" size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Как это работает?</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Поделись своей реферальной ссылкой с друзьями</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Друг оформляет карту по твоей ссылке</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Ты получаешь 200₽ после выполнения условий</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 border-2 border-accent/20 hover:shadow-xl transition-all bg-gradient-to-br from-accent/5 to-orange-50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center">
                  <Icon name="TrendingUp" size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Без ограничений!</h3>
              </div>
              <p className="text-gray-700 text-lg mb-4">
                Приглашай неограниченное количество друзей и зарабатывай без лимитов!
              </p>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-5xl font-extrabold text-accent mb-2">∞</div>
                <div className="text-gray-600 font-semibold">Рефералов</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="withdraw" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Вывод средств 💳
          </h2>
          <Card className="p-8 border-2 border-primary/20">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Smartphone" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Через СБП</h3>
                  <p className="text-gray-600">
                    Выводи деньги мгновенно через Систему Быстрых Платежей. Укажи номер телефона и банк при отправке чека.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Сроки обработки</h3>
                  <p className="text-gray-600">
                    После проверки чека администратором деньги поступят на ваш счёт в течение 1-3 рабочих дней.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Безопасность</h3>
                  <p className="text-gray-600">
                    Все переводы проходят через официальную систему СБП. Ваши данные защищены.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-16 px-4 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Частые вопросы 💬
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-xl px-6 border-2 border-purple-100">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Почему я должен получить деньги?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Мы получаем вознаграждение от Альфа-Банка за привлечение новых клиентов и делимся этим вознаграждением с вами! 
                Это взаимовыгодное сотрудничество.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-xl px-6 border-2 border-purple-100">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Сколько времени занимает проверка?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Обычно проверка чека занимает от нескольких часов до 1 рабочего дня. После одобрения деньги приходят в течение 1-3 рабочих дней.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-xl px-6 border-2 border-purple-100">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Есть ли скрытые условия?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Нет! Всё абсолютно прозрачно: оформляешь карту, делаешь покупку от 200₽, отправляешь чек — получаешь 500₽. 
                Никаких дополнительных условий или комиссий.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-xl px-6 border-2 border-purple-100">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Можно ли участвовать несколько раз?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Основной бонус можно получить один раз, но вы можете зарабатывать неограниченно через партнёрскую программу, 
                приглашая друзей и получая по 200₽ за каждого!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-xl px-6 border-2 border-purple-100">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Что если чек не пройдёт проверку?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                Мы свяжемся с вами и объясним причину. Обычно это связано с тем, что условия не были выполнены полностью. 
                Вы сможете исправить ситуацию и отправить чек повторно.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Остались вопросы? 📞
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Свяжитесь с нами в Telegram для получения помощи
          </p>
          <Button 
            size="lg" 
            className="text-xl px-10 py-7 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-xl"
            asChild
          >
            <a href="https://t.me/Alfa_Bank778" target="_blank" rel="noopener noreferrer">
              <Icon name="Send" size={24} className="mr-3" />
              Написать в Telegram
            </a>
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold">БонусПро</span>
            </div>
            <p className="text-gray-400 text-sm text-center">
              © 2024 БонусПро. Все права защищены. Мы не являемся официальным представителем Альфа-Банка.
            </p>
          </div>
        </div>
      </footer>

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-8 animate-scale-in shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Вывод средств</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-gray-500 hover:text-gray-700">
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-xl mb-6 border-2 border-green-500/30">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Доступно для вывода</p>
                <p className="text-4xl font-extrabold text-green-600">{balance}₽</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="withdrawAmount" className="text-base font-semibold">Сумма вывода</Label>
                <Input 
                  id="withdrawAmount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Минимум 500₽"
                  className="h-12 text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Минимальная сумма: 500₽</p>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Способ вывода</Label>
                <div className="space-y-2">
                  <button 
                    onClick={() => setWithdrawMethod('card')}
                    className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                      withdrawMethod === 'card' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon name="CreditCard" size={24} className={withdrawMethod === 'card' ? 'text-primary' : 'text-gray-400'} />
                    <div>
                      <p className="font-semibold">Банковская карта</p>
                      <p className="text-sm text-gray-500">Срок: 1-3 дня</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setWithdrawMethod('phone')}
                    className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                      withdrawMethod === 'phone' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon name="Smartphone" size={24} className={withdrawMethod === 'phone' ? 'text-primary' : 'text-gray-400'} />
                    <div>
                      <p className="font-semibold">На номер телефона</p>
                      <p className="text-sm text-gray-500">Срок: 1 час</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button 
                onClick={handleWithdraw}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600"
              >
                <Icon name="Check" size={20} className="mr-2" />
                Вывести
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;