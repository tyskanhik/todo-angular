import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class StorajeUtil {
  /**
   * Получение данных из localStorage
   * @param key Ключ
   */
  get<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null
    } catch(e) {
      console.error('Ошибка при чтении из localStorage', e);
      return null;
    }
  }

  /**
   * Сохранение данных в localstorage
   * @param key Ключ
   * @param value Данные
   */
  set(key: string, value: never): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch(e) {
      console.error('Ошибка при записи в localStorage', e);
    }
  }

  /**
   * Удаление записи из localStorage
   * @param key Ключ
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('Ошибка при удалении записи из localStorage', e)
    }
  }
}