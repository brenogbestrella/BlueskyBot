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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
var BskyAgent = require('@atproto/api').BskyAgent;
var dotenv = require("dotenv");
var process = require("process");
var fs_1 = require("fs");
var path = require('path');
dotenv.config();
var filePath = path.join(__dirname, 'public', 'img', 'GWRaCraWwAAzlr8.jpg');
var image = filePath;
var encoding = 'image/jpeg';
function readFileAsUint8Array(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var buffer, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.readFile(filePath)];
                case 1:
                    buffer = _a.sent();
                    return [2 /*return*/, new Uint8Array(buffer)];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error('Erro reading the file:', error_1.message);
                    }
                    else {
                        console.error('Unknown Error while reading the file:', error_1);
                    }
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Create a Bluesky Agent 
var agent = new BskyAgent({
    service: 'https://bsky.social',
});
var username = process.env.BLUESKY_USERNAME;
var password = process.env.BLUESKY_PASSWORD;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var fileData, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, agent.login({ identifier: username, password: password })];
                case 1:
                    _a.sent();
                    if (!username || !password) {
                        throw new Error('Variables BLUESKY_USERNAME e BLUESKY_PASSWORD not defined');
                    }
                    return [4 /*yield*/, readFileAsUint8Array(image)];
                case 2:
                    fileData = _a.sent();
                    return [4 /*yield*/, agent.uploadBlob(fileData, { encoding: encoding })];
                case 3:
                    data = (_a.sent()).data;
                    if (!data || !data.blob) {
                        throw new Error('UploadBlob does not contain expected blob');
                    }
                    return [4 /*yield*/, agent.post({
                            text: "🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨",
                            embed: {
                                $type: 'app.bsky.embed.images',
                                images: [
                                    {
                                        alt: 'Imagem de um mico leão dourado com as palavras: MEIA NOITE!!, HORÁRIO OFICIAL DO ÓLEO DE MACACO',
                                        image: data.blob,
                                        aspecRatio: {
                                            width: 1000,
                                            height: 500
                                        }
                                    }
                                ],
                            },
                            createdAt: new Date().toISOString()
                        })];
                case 4:
                    _a.sent();
                    console.log("Just posted!");
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error) {
                        console.error('Error while executing main function:', error_2.message);
                    }
                    else {
                        console.error('Unknown Error while executing main function:', String(error_2));
                    }
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
