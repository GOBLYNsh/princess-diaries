import { Suspense } from 'react';
import Homepage from '@/components/home/Homepage';
import { supabase } from '@/lib/supabase';

async function getSiteSettings() {
  const { data, error } = await supabase
    .from('website_settings')
    .select('*')
    .single();

  if (error) {
    return {
      recipient_name: '[Her Name]',
      princess_title: 'Princess',
      welcome_message: 'Happy Princess Day! May your day be filled with joy, sparkles, and all the magical moments you deserve!',
      letter_content: 'My dearest princess,\n\nToday is special not because of parties or presents, but because it is a celebration of YOU. You bring magic to every ordinary moment with your beautiful smile and kind heart.\n\nMay this day be as wonderful as you are.\n\nWith all my love,\n[Your Secret Admirer]'
    };
  }

  return data || {
    recipient_name: '[Her Name]',
    princess_title: 'Princess',
    welcome_message: 'Happy Princess Day!',
    letter_content: 'Dear Princess,\n\nHappy Princess Day!'
  };
}

async function getReasons() {
  const { data, error } = await supabase
    .from('reasons')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    return [
      { id: '1', reason: 'Your beautiful smile that lights up every room', order_index: 1, created_at: new Date().toISOString() },
      { id: '2', reason: 'Your random conversations that always make me laugh', order_index: 2, created_at: new Date().toISOString() },
      { id: '3', reason: 'Your adorable expressions when you concentrate', order_index: 3, created_at: new Date().toISOString() },
      { id: '4', reason: 'The way you make ordinary moments feel special', order_index: 4, created_at: new Date().toISOString() },
      { id: '5', reason: 'Simply being yourself - authentically and wonderfully you', order_index: 5, created_at: new Date().toISOString() },
    ];
  }

  return data || [];
}

async function getSurpriseMessages() {
  const { data, error } = await supabase
    .from('surprise_messages')
    .select('*');

  if (error) {
    return {
      heart_click: 'A heart full of love for you! 💖',
      gift_open: 'Surprise! Everything about you is special!',
      bouquet_interaction: 'These are for all the beautiful moments we've shared...'
    };
  }

  return {
    heart_click: data?.find(d => d.trigger === 'heart_click')?.message || 'A heart full of love!',
    gift_open: data?.find(d => d.trigger === 'gift_open')?.message || 'Surprise!',
    bouquet_interaction: data?.find(d => d.trigger === 'bouquet_interaction')?.message || 'Beautiful moments!'
  };
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  const reasons = await getReasons();
  const surpriseMessages = await getSurpriseMessages();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Homepage
        settings={settings}
        reasons={reasons}
        surpriseMessages={surpriseMessages}
      />
    </Suspense>
  );
}