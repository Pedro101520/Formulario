class ValidaCpf{
    constructor(cpfEnviado){
        //Aqui é a encapsulação de um atributo
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    priNum(){
        let j = 0, soma = 0;
        for(let i = 10; i >= 2; i--, j++){
            soma += this.cpfLimpo[j] * i;
        }
        soma = 11 - (soma % 11);
        if (soma > 9)
            return 0;
        return soma;
    }

    ultNum(){
        let j = 0, soma = 0;
        for(let i = 11; i >= 3; i--, j++){
            soma += this.cpfLimpo[j] * i;
        }
        soma += 2 * this.priNum();
        soma = 11 - (soma % 11);
        if(soma > 9)
            return 0;
        return soma;
    }

    verificaCpf(){
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        let priDig = this.priNum();
        let ultDig = this.ultNum();
        let novoCpf = cpfSemDigitos + priDig.toString() + ultDig.toString();
        return novoCpf === this.cpfLimpo;
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        return this.verificaCpf();
    }
}
