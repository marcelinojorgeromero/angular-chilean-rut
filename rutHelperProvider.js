(function (angular) {
    "use strict";

    function rutHelperProvider() {
        function StringBuilder(str) {
            this.value = str;
            return this;
        }
        StringBuilder.prototype.append = function (str) {
            this.value = this.value + str;
            return this;
        };
        StringBuilder.prototype.toString = function () {
            return this.value;
        };
        StringBuilder.prototype.charAt = String.prototype.charAt;
        StringBuilder.prototype.insert = function (position, str) {
            this.value = this.value.slice(0, position) + str + this.value.slice(position);
            return this;
        };
        StringBuilder.prototype.reverse = function () {
            var o = '';
            for (var i = this.value.length - 1; i >= 0; i--) o += this.value[i];
            return o;
        };
        String.prototype.sum = function (callback) {
            var sum = 0;
            for (var i = 0; i < this.length; i++) {
                sum += callback(this[i]);
            }
            return sum;
        };
        //StringBuilder.prototype.trim = function () {
        //    this.value.replace(/^\s+|\s+$/gm, "");
        //    return this;
        //};

        var minimumRutLength = 3;
         
        function calculateDigitoVerificador(sRutSinDigitoVerificador) {
            var rut = removeFormat(sRutSinDigitoVerificador);
            if (isNullOrWhiteSpace(rut)) throw "Invalid Argument: sRutSinDigitoVerificador"
            return _calculateDigitoVerificador(rut);
        }

        function _calculateDigitoVerificador(sRutSinDigitoVerificador){
            var digitoVerificadorLetraK = "K",
                factorInicial = 2,
                factorUltimo = 7;
            
            var indiceFactor = factorInicial - 1;
            var rutReverted = new StringBuilder(removeFormat(sRutSinDigitoVerificador)).reverse();
            var calculatedSum = rutReverted.sum(function (numChr) {
                indiceFactor = (indiceFactor == factorUltimo ? factorInicial : ++indiceFactor);
                return indiceFactor * parseInt(numChr);
            });

            var digitoVerificador;
            var result = calculatedSum % 11;

            switch (result) {
            case 0:
                digitoVerificador = "0";
                break;
            case 1:
                digitoVerificador = digitoVerificadorLetraK;
                break;
            default:
                digitoVerificador = (11 - result).toString();
                break;
            }
            return digitoVerificador;
        }
        
        function formatRut(rutCompleto, bFormatRut, bFormatDigitoVerificador, cFormatRutDelimiter, cFormatDigitoVerificadorDelimiter) {
            var rutPurificado = removeFormat(rutCompleto);
            if (isNullOrWhiteSpace(rutPurificado)) return "";
            if (isRutLessThanTheMinimun(rutPurificado)) return rutPurificado;
            
            bFormatRut = bFormatRut || true;
            bFormatDigitoVerificador = bFormatDigitoVerificador || true;
            cFormatRutDelimiter = cFormatRutDelimiter || ".";
            cFormatDigitoVerificadorDelimiter = cFormatDigitoVerificadorDelimiter || "-";
            
            if (rutPurificado.length < minimumRutLength) return rutPurificado;

            var formatRutWithDelimiter = function (rutSinDigitoVerificador, strToFormat) {
                while (rutSinDigitoVerificador.length > minimumRutLength) {
                    strToFormat.insert(0, cFormatRutDelimiter + rutSinDigitoVerificador.substring(rutSinDigitoVerificador.length - minimumRutLength));
                    rutSinDigitoVerificador = rutSinDigitoVerificador.substring(0, rutSinDigitoVerificador.length - minimumRutLength);
                }
                strToFormat.insert(0, rutSinDigitoVerificador);
                return strToFormat;
            };

            var digitoVerificador = rutPurificado.charAt(rutPurificado.length - 1);
            var rutSinDv = rutPurificado.substring(0, rutPurificado.length - 1);
            var formatted = (bFormatRut) ? formatRutWithDelimiter(rutSinDv, new StringBuilder("")) : new StringBuilder(rutSinDv);

            if (bFormatDigitoVerificador) formatted.append(cFormatDigitoVerificadorDelimiter);

            return formatted.append(digitoVerificador).toString();
        }
        
        function getRutSinDigitoVerificador(sRutCompleto) {
            if (isRutNullOrEmptyOrLessThanTheMinimum(sRutCompleto)) throw "Invalid Argument: sRutCompleto";
            var rut = parseInt(removeFormat(sRutCompleto.substring(0, sRutCompleto.length - 1)));
            return rut;
        }

        function _getRutSinDigitoVerificador(sRutCompleto) {
            return sRutCompleto.substring(0, sRutCompleto.length - 1);
        }
                
        function getDigitoVerificador(sRutCompleto) {
            if (isNullOrWhiteSpace(sRutCompleto)) throw "Invalid Argument: sRutCompleto";
            return _getDigitoVerificador(sRutCompleto);
        }

        function _getDigitoVerificador(sRutCompleto) {
            return sRutCompleto.charAt(sRutCompleto.length - 1);
        }
        
        function removeFormat(sRutCompleto) {
            if(isNullOrWhiteSpace(sRutCompleto)) return "";
            var sRut = sRutCompleto;
            return sRut.replace(/[^0-9|k|K]/g, '');
        }

        function isDigitoVerificadorValidChar(sDv) {
            return /^[\d|k|K]$/.test(sDv);
        }

        function isNullOrWhiteSpace(value) {
            if (value == null) return true;
            if (typeof value !== "string") return false;
            return !/\S/.test(value);
        }

        function isRutLessThanTheMinimun(sRutCompleto){
            return sRutCompleto.length < minimumRutLength;
        }
        
        function isRutNullOrEmptyOrLessThanTheMinimum(sRutCompleto){
            return isNullOrWhiteSpace(sRutCompleto) || sRutCompleto.length < minimumRutLength;
        }
        
        function isRutValid() {
            return arguments.length == 1 ?  validateCompleteRut(arguments[0]) : validateSeparatedRutAndDigitoVerificador(arguments[0], arguments[1]);
        }

        function validateCompleteRut(sRutCompleto){
            if (isRutNullOrEmptyOrLessThanTheMinimum(sRutCompleto)) return false;
            var rutSinDv = _getRutSinDigitoVerificador(sRutCompleto);
            var sDv = _getDigitoVerificador(sRutCompleto);
            return _isRutValid(rutSinDv, sDv);
        }
        
        function validateSeparatedRutAndDigitoVerificador(sRutSinDigitoVerificador, sDigitoVerificador) {
            if (isNullOrWhiteSpace(sDigitoVerificador) || isNullOrWhiteSpace(sRutSinDigitoVerificador)) return false;
            return _isRutValid(sRutSinDigitoVerificador, sDigitoVerificador);
        }

        function _isRutValid(sRutSinDigitoVerificador, sDigitoVerificador) {
            var cleanedRut = removeFormat(sRutSinDigitoVerificador);
            return !isNullOrWhiteSpace(cleanedRut) && sDigitoVerificador === _calculateDigitoVerificador(sRutSinDigitoVerificador);
        }

        var api = {
            format: formatRut,
            removeFormat: removeFormat,
            isDigitoVerificadorValidChar: isDigitoVerificadorValidChar,
            calculateDigitoVerificador: calculateDigitoVerificador,
            isRutValid: isRutValid,
            getRutSinDigitoVerificador: getRutSinDigitoVerificador,
            getDigitoVerificador: getDigitoVerificador
        };
        return angular.extend({}, api, {
            $get: function() {
                return api;
            }
        });
    }
    
    angular
        .module("mjr.rut")
        .provider("rutHelper", rutHelperProvider);
})(angular);
