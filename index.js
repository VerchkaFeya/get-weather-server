"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;
app.use((0, cors_1.default)());
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳');
});
app.get('/weather/:latlon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const latlon = req.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];
    const config = {
        method: 'GET',
        url: `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&limit=6`,
        headers: {
            'X-Yandex-API-Key': API_KEY,
        },
    };
    try {
        const axiosResp = yield (0, axios_1.default)(config);
        res.send(axiosResp.data);
    }
    catch (error) {
        res.send('Something wrong. Reload');
    }
}));
