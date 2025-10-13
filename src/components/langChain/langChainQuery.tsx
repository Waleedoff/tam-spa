// src/components/common/langchain/LangchainQuery.tsx

import { useState } from 'react';
import { LoaderCircle, Bot } from 'lucide-react';
import { useLangchainStore } from 'src/core/stores/langChainStore';

export function LangchainQuery() {
  const [text, setText] = useState('');
  const { query, response, loading } = useLangchainStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await query(text);
    }
  };

  return (
    <div className="fixed bottom-4 left-[272px] w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        <Bot className="text-purple-600" />
        <h2 className="text-lg font-semibold">AI answered </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-b border-gray-100 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب سؤالك..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
        >
          إرسال
        </button>
      </form>

      <div className="p-4">
        {loading ? (
          <div className="flex items-center text-gray-600 gap-2 text-sm">
            <LoaderCircle className="animate-spin w-4 h-4" />
            جاري المعالجة...
          </div>
        ) : response ? (
          <div className="text-gray-800 text-sm whitespace-pre-wrap">
            {typeof response === 'string' ? response : JSON.stringify(response)}
          </div>
        ) : (
          <div className="text-gray-400 text-sm italic">أدخل سؤالًا لتحصل على إجابة</div>
        )}
      </div>
    </div>
  );
}
