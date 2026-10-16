# TASKFLOW - Görev ve Proje Yönetim Sistemi API

Node.js ve Express.js ile geliştirilmiş, görevleri oluşturmaya, listelemeye, güncellemeye ve silmeye olanak tanıyan bir REST API projesidir. Veriler `src/data/tasks.json` dosyasında saklanır.

## Gereksinimler
- [Node.js](https://nodejs.org/) (v18 veya üzeri)
- npm (Node.js ile birlikte gelir)
- Git (projeyi klonlamak için)
- [Postman](https://www.postman.com/) (test için)

Kurulu sürümleri kontrol etmek için:

```bash
node -v
npm -v
```

## Kurulum

### 1. Projeyi indirin
```bash
git clone https://github.com/ismailhadimioglu/taskflow-backend.git
cd taskflow-backend
```
> ZIP olarak indirdiyseniz arşivi açın ve klasörün içine terminalden girin.

### 2. Bağımlılıkları kurun
```bash
npm install
```
Bu komut `express` ve `nodemon` paketlerini kurar.

### 3. Sunucuyu çalıştırın
Geliştirme modu (dosya değişince otomatik yeniden başlar):
```bash
npm run dev
```
Normal mod:
```bash
npm start
```
Başarılı olursa konsolda şu mesaj görünür:
```
TASKFLOW API http://localhost:3000 adresinde çalışıyor.
```

## Proje Yapısı
```
taskflow-backend/
├── screenshots/
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── data/
│   │   └── tasks.json
│   ├── middleware/
│   │   └── logger.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── app.js
├── .gitignore
├── package-lock.json
├── package.json
├── PROJECT_SUMMARY.md
└── README.md
```

## API Endpoint'leri
| Metot | Endpoint | Açıklama |
|---|---|---|
| POST | `/api/tasks` | Görev ekler (`title` zorunlu) |
| GET | `/api/tasks` | Görevleri listeler |
| GET | `/api/tasks/:id` | Görev detayı |
| PUT | `/api/tasks/:id` | Görev günceller |
| DELETE | `/api/tasks/:id` | Görev siler |

Örnek istek gövdesi (POST/PUT):
```json
{
  "title": "Rapor yaz",
  "description": "Haftalık rapor",
  "status": "pending",
  "priority": "high",
  "assignee": "İsmail"
}
```

## Postman ile Test
1. Sunucunun çalıştığından emin olun (`npm run dev`).
2. Postman'de yeni bir istek açın, yöntemi ve adresi seçin (örn. `GET http://localhost:3000/api/tasks`).
3. POST ve PUT için **Body > raw > JSON** seçip yukarıdaki örnek gövdeyi gönderin.
4. Test ekran görüntüleri `screenshots/` klasöründedir.

## Logger
Her istek konsola şu formatta yazılır:
```
[2026-10-16T12:00:00.000Z] GET /api/tasks
```