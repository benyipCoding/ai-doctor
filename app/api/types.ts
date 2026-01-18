export interface InlineData {
  mimeType: string;
  data: string; // base64 字符串
}

export interface InlineDataPart {
  inlineData: InlineData;
}

export interface TextPart {
  text: string;
}

export type ContentPart = TextPart | InlineDataPart;

export interface Content {
  role: "user" | "assistant" | string;
  parts: ContentPart[];
}

export interface GenerationConfig {
  responseMimeType?: string;
  [key: string]: any;
}

export interface RequestPayload {
  contents: Content[];
  generationConfig?: GenerationConfig;
}
