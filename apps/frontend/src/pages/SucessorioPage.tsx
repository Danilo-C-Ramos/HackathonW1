
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SucessorioPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-w1-teal">Planejamento Sucessório</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Planejamento de Herança e Sucessão</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            O planejamento sucessório é essencial para garantir a transmissão segura e eficiente do seu patrimônio, de acordo com seus desejos e com menor carga tributária.
          </p>
          
          <div className="mt-6 space-y-4">
            <Button className="w-full">Iniciar Planejamento Sucessório</Button>
            <Button variant="outline" className="w-full">Agendar Consulta com Especialista</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Testamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className="text-red-500 font-medium">Não iniciado</span>
            </div>
            <Button variant="outline" className="w-full mt-4">Iniciar</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Seguro de Vida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className="text-amber-500 font-medium">Em análise</span>
            </div>
            <Button variant="outline" className="w-full mt-4">Conferir</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Simulador de Cenários Sucessórios</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Compare diferentes cenários de sucessão e entenda o impacto fiscal e patrimonial de cada um.
          </p>
          <Button className="w-full">Acessar Simulador</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SucessorioPage;
