import { useState, useEffect, useRef } from 'react';
import BirthdayHero from './BirthdayHero';
import ImagePage from './ImagePage';
import TextPage from './TextPage';
import PasswordPage from './PasswordPage';
import ProgressIndicator from './ProgressIndicator';

interface Page {
  type: 'hero' | 'image' | 'text' | 'password';
  imageUrl?: string;
  text?: string;
  imageCaption?: string;
}

export default function FullPageScroll() {
  const [currentPage, setCurrentPage] = useState(0);
  const [unlockedPassword, setUnlockedPassword] = useState(false);
  const [secureImageUrl, setSecureImageUrl] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [swipeFeedback, setSwipeFeedback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const pages: Page[] = [
    { type: 'hero' },
    { type: 'image', imageUrl: '/1.jpg', imageCaption: 'Ki khobor tomader' },
    { type: 'image', imageUrl: '/2.jpg', imageCaption: 'Ben 14' },
    { type: 'image', imageUrl: '/3.jpg', imageCaption: 'Colgate' },
    { type: 'image', imageUrl: '/4.jpg', imageCaption: 'Nice pic dear' },
    { type: 'image', imageUrl: '/5.jpg', imageCaption: 'Emo boy' },
    { type: 'text', text: 'Jumpscare Alert 😱' },
    { type: 'image', imageUrl: '/6.jpg', imageCaption: 'Get Olle omued bitch' },
    { type: 'text', text: 'Loving Memories' },
    { type: 'image', imageUrl: '/7.jpg', imageCaption: 'King & Queen' },
    { type: 'image', imageUrl: '/8.jpg', imageCaption: 'wooww' },
    { type: 'text', text: 'True Love Alert 🥰' },
    { type: 'password' },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      e.preventDefault();

      const direction = e.deltaY > 0 ? 1 : -1;
      const newPage = currentPage + direction;

      if (newPage >= 0 && newPage < pages.length) {
        setIsScrolling(true);
        setCurrentPage(newPage);
        scrollToPage(newPage);

        setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.tagName === 'TEXTAREA') {
        return;
      }
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.tagName === 'TEXTAREA') {
        return;
      }
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isScrolling) return;

      const swipeDistance = touchStartY.current - touchEndY.current;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        const direction = swipeDistance > 0 ? 1 : -1;
        const newPage = currentPage + direction;

        if (newPage >= 0 && newPage < pages.length) {
          setSwipeFeedback(true);
          setIsScrolling(true);
          setCurrentPage(newPage);
          scrollToPage(newPage);

          setTimeout(() => {
            setSwipeFeedback(false);
          }, 300);

          setTimeout(() => {
            setIsScrolling(false);
          }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage, isScrolling, pages.length]);

  const handlePasswordUnlock = (imageUrl: string) => {
    setUnlockedPassword(true);
    setSecureImageUrl(imageUrl);
  };

  const scrollToPage = (index: number) => {
    setIsScrolling(true);
    setCurrentPage(index);
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const renderCurrentPage = () => {
    const page = pages[currentPage];

    if (page.type === 'hero') {
      return <BirthdayHero name="Ayomoy Olee" />;
    }

    if (page.type === 'image' && page.imageUrl) {
      return (
        <ImagePage
          imageUrl={page.imageUrl}
          caption={page.imageCaption || ''}
        />
      );
    }

    if (page.type === 'text' && page.text) {
      return <TextPage text={page.text} />;
    }

    if (page.type === 'password') {
      return (
        <PasswordPage
          onUnlock={handlePasswordUnlock}
          isUnlocked={unlockedPassword}
          finalImageUrl={secureImageUrl}
        />
      );
    }

    return null;
  };

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      <ProgressIndicator
        totalPages={pages.length}
        currentPage={currentPage}
        onPageClick={scrollToPage}
      />

      {swipeFeedback && (
        <div className="fixed inset-0 bg-white/5 pointer-events-none animate-pulse z-50"></div>
      )}

      <div className={`transition-all duration-500 ${swipeFeedback ? 'scale-95' : 'scale-100'}`}>
        {renderCurrentPage()}
      </div>
    </div>
  );
}
