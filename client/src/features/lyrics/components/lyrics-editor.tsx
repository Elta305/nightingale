import { type KeyboardEvent, type Ref } from 'react';

import { Textarea } from '@/shared/components/ui/textarea';
import { cn } from '@/shared/utils/cn';

import { NO_FOCUS_RING_CLASS, RING_CLASS } from './parts';

const TEXTAREA_ROWS = 16;
// Kana or kanji present: surface the {base|reading} override syntax the analyzer understands.
const CJK_PATTERN = /[぀-ヿ㐀-鿿]/;

const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.blur();
  }
};

type LyricsEditorProps = {
  textareaRef: Ref<HTMLTextAreaElement>;
  text: string;
  onChange: (text: string) => void;
  disabled: boolean;
  loadingInitial: boolean;
  lineCount: number;
  isDirty: boolean;
  focused: boolean;
};

export const LyricsEditor = ({
  textareaRef,
  text,
  onChange,
  disabled,
  loadingInitial,
  lineCount,
  isDirty,
  focused,
}: LyricsEditorProps) => {
  return (
    <>
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={TEXTAREA_ROWS}
        placeholder={loadingInitial ? 'Loading lyrics…' : 'Enter lyrics, one line per row'}
        disabled={disabled}
        className={cn(
          'min-h-0 flex-1 overflow-y-auto bg-card font-mono whitespace-pre [field-sizing:fixed]',
          NO_FOCUS_RING_CLASS,
          focused && RING_CLASS,
        )}
        spellCheck={false}
      />
      <p className="mt-2 text-[11px] text-muted-foreground">
        {lineCount} {lineCount === 1 ? 'line' : 'lines'}
        {isDirty ? ' • unsaved changes' : ''}
      </p>
      {CJK_PATTERN.test(text) && (
        <p className="mt-1 text-[11px] text-muted-foreground">
          Fix a reading with {'{漢字|かな}'} or {'{漢字|romaji}'}, e.g. {'{彷徨|さまよ}って'}
        </p>
      )}
    </>
  );
};
