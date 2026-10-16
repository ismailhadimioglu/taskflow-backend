# TASKFLOW - Proje Tanıtım Dokümanı

## 1. Projenin Amacı
TASKFLOW, Node.js ve Express.js kullanılarak geliştirilmiş bir **Görev ve Proje Yönetim Sistemi REST API**'sidir. Proje; Node.js ve Express.js ile REST API tasarımı, routing, middleware kullanımı, CRUD operasyonları ve JSON ile veri yönetimi konularındaki becerileri uygulamalı olarak göstermeyi amaçlar.

## 2. Senaryo
Bir yazılım şirketi, ekip içerisindeki görevleri, projeleri ve çalışanların sorumluluklarını takip etmek istemektedir. TASKFLOW API'si bu ihtiyaç için aşağıdakileri sağlar:

- Görev oluşturulması
- Görevlerin çalışanlara atanması (`assignee`)
- Görev durumlarının takibi (`pending` / `completed`)
- Öncelik yönetimi (`low` / `medium` / `high`)

Sistem tamamen REST API mantığındadır; herhangi bir web veya mobil arayüz bu API'ye HTTP istekleri göndererek kullanabilir.

## 3. Sistem Özeti
| Bileşen | Açıklama |
|---|---|
| Teknolojiler | Node.js, Express.js, `fs` modülü, nodemon |
| Veri saklama | `src/data/tasks.json` dosyası |
| Routing | `express.Router()` ile modüler yapı (`src/routes/taskRoutes.js`) |
| İş mantığı | CRUD operasyonları (`src/controllers/taskController.js`) |
| Middleware | Logger: method, endpoint ve ISO zaman damgasını konsola yazar (`src/middleware/logger.js`) |
| Sunucu | `src/app.js`, port 3000 |

## 4. Veri Modeli (Task)
| Alan | Tip | Açıklama |
|---|---|---|
| `id` | Number | Otomatik üretilen benzersiz kimlik |
| `title` | String | Görev başlığı (**zorunlu**) |
| `description` | String | Görev açıklaması |
| `status` | String | `pending` veya `completed` (varsayılan: `pending`) |
| `priority` | String | `low`, `medium` veya `high` (varsayılan: `medium`) |
| `assignee` | String | Görevin atandığı kişi |
| `createdAt` | String | ISO 8601 formatında oluşturulma zamanı |

## 5. API Endpoint Listesi
| Metot | Endpoint | Açıklama | Başarılı | Hata |
|---|---|---|---|---|
| POST | `/api/tasks` | Yeni görev ekler | 201 | 400 (title eksik) |
| GET | `/api/tasks` | Tüm görevleri listeler | 200 | - |
| GET | `/api/tasks/:id` | Görev detayını getirir | 200 | 404 |
| PUT | `/api/tasks/:id` | Görevi günceller | 200 | 404, 400 |
| DELETE | `/api/tasks/:id` | Görevi siler | 200 | 404 |

## 6. Test
Tüm CRUD endpoint'leri Postman ile test edilmiştir. Ekran görüntüleri `screenshots/` klasöründedir.