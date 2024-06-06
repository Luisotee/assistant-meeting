interface Text {
  body: string;
}

export interface Message {
  from: string;
  id: string;
  timestamp: string;
  text: Text;
  type: string;
}
