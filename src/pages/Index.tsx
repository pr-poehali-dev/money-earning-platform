import { useState } from 'react';
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

  const handleSubmitReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptFile || !phone || !bank) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Чек отправлен на проверку! Мы свяжемся с вами в ближайшее время.');
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
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent leading-tight">
              Получи 1000₽ прямо сейчас! 💸
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-semibold">
              500₽ от нас + 500₽ от Альфа-Банка
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <div className="bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl p-8 shadow-2xl animate-pulse-glow">
                <div className="text-6xl font-extrabold mb-2">500₽</div>
                <div className="text-lg font-semibold">От БонусПро</div>
              </div>
              <div className="text-4xl text-gray-400 font-bold">+</div>
              <div className="bg-gradient-to-br from-accent to-orange-600 text-white rounded-2xl p-8 shadow-2xl animate-pulse-glow">
                <div className="text-6xl font-extrabold mb-2">500₽</div>
                <div className="text-lg font-semibold">От Альфа-Банка</div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-xl hover:shadow-2xl animate-scale-in"
              onClick={() => scrollToSection('how')}
            >
              <Icon name="Rocket" size={28} className="mr-3" />
              Начать зарабатывать
            </Button>
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
