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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refId = params.get('ref');
    if (refId) {
      localStorage.setItem('referral_id', refId);
      toast.success(`Вы перешли по реферальной ссылке! Вы получите 500₽, а ваш друг ${refId} получит 200₽!`);
    }
  }, []);

  const generateReferralLink = () => {
    const newId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferralId(newId);
    const link = `${window.location.origin}/?ref=${newId}`;
    setReferralLink(link);
    setShowReferralCard(true);
    toast.success('Реферальная ссылка создана! Делитесь с друзьями!');
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Ссылка скопирована в буфер обмена!');
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
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
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('how')} className="text-sm font-semibold hover:text-primary transition-colors">
                Как получить
              </button>
              <button onClick={() => scrollToSection('referral')} className="text-sm font-semibold hover:text-primary transition-colors">
                Партнёрка
              </button>
              <button onClick={() => scrollToSection('withdraw')} className="text-sm font-semibold hover:text-primary transition-colors">
                Вывод
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-sm font-semibold hover:text-primary transition-colors">
                FAQ
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm font-semibold hover:text-primary transition-colors">
                Контакты
              </button>
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-xl hover:shadow-2xl animate-scale-in w-full sm:w-auto"
                onClick={() => scrollToSection('how')}
              >
                <Icon name="Rocket" size={28} className="mr-3" />
                Начать зарабатывать
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-xl px-12 py-8 rounded-2xl border-2 border-primary/30 hover:bg-primary/5 w-full sm:w-auto"
                onClick={() => scrollToSection('referral')}
              >
                <Icon name="Users" size={28} className="mr-3" />
                Партнёрская программа
              </Button>
            </div>
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
            <Card className="p-8 mb-12 border-2 border-accent/30 bg-gradient-to-br from-white to-accent/5 animate-scale-in">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-orange-600 rounded-2xl mb-4 animate-pulse-glow">
                  <Icon name="Link" size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Твоя реферальная ссылка готова! 🎉</h3>
                <p className="text-gray-600 mb-6">
                  Делись с друзьями и получай 200₽ за каждого!
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-4 mb-4 border-2 border-dashed border-primary/30">
                <p className="text-sm text-gray-500 mb-2 font-semibold">Твоя ссылка:</p>
                <div className="flex items-center gap-2">
                  <Input 
                    value={referralLink} 
                    readOnly 
                    className="font-mono text-sm bg-gray-50"
                  />
                  <Button onClick={copyReferralLink} size="lg" className="flex-shrink-0 bg-gradient-to-r from-primary to-accent">
                    <Icon name="Copy" size={20} />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="CircleDollarSign" size={32} className="text-green-600" />
                  <h4 className="text-xl font-bold text-green-900">Как это работает?</h4>
                </div>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <span>Отправь эту ссылку другу в WhatsApp, Telegram или соцсетях</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <span>Друг оформляет карту по твоей ссылке и выполняет условия</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <span><strong className="text-green-700">Ты получаешь 200₽</strong> после проверки чека друга!</span>
                  </li>
                </ol>
              </div>

              <div className="mt-6 text-center">
                <Button 
                  onClick={generateReferralLink}
                  variant="outline"
                  className="border-2 border-primary/30 hover:bg-primary/5"
                >
                  <Icon name="RefreshCw" size={20} className="mr-2" />
                  Создать новую ссылку
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
    </div>
  );
};

export default Index;