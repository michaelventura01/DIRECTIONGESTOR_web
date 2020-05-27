import * as jsPDF from 'jspdf';
import { UserOptions } from 'jspdf-autotable';

export interface JsPDFWithPlugin extends jsPDF {
  autotable:(options: UserOptions) => jsPDF;
}
