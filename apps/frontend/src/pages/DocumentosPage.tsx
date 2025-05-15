
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Lock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DocumentosPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-w1-teal">Documentos</h1>

      <div className="flex items-center gap-2 border rounded-md px-4 py-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input placeholder="Pesquisar documentos..." className="border-none shadow-none focus-visible:ring-0" />
      </div>

      <Tabs defaultValue="todos">
        <TabsList className="w-full">
          <TabsTrigger value="todos" className="flex-1">Todos</TabsTrigger>
          <TabsTrigger value="pessoais" className="flex-1">Pessoais</TabsTrigger>
          <TabsTrigger value="holdings" className="flex-1">Holdings</TabsTrigger>
          <TabsTrigger value="sucessao" className="flex-1">Sucessão</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todos" className="space-y-4 mt-4">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted py-3">
              <CardTitle className="text-lg">Documentos Importantes</CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              <DocumentItem 
                icon={<FileText className="h-5 w-5 text-blue-500" />}
                title="Contrato Social - Família Silva Holdings"
                date="12/04/2023"
                size="1.2 MB"
              />
              <DocumentItem 
                icon={<FileText className="h-5 w-5 text-purple-500" />}
                title="Declaração de Imposto de Renda 2023"
                date="30/05/2023"
                size="3.8 MB"
              />
              <DocumentItem 
                icon={<FileText className="h-5 w-5 text-green-500" />}
                title="Escritura do Imóvel - Apartamento"
                date="15/01/2022"
                size="2.5 MB"
              />
              <DocumentItem 
                icon={<FileText className="h-5 w-5 text-amber-500" />}
                title="Certificado de Ações - Empresa XYZ"
                date="03/09/2022"
                size="0.8 MB"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Adicionar novos documentos</h3>
              <p className="text-muted-foreground mb-4">
                Faça upload de documentos importantes para manter todo seu acervo organizado e seguro.
              </p>
              <Button>Upload de Documentos</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pessoais" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Cofre Digital Pessoal</h3>
                  <p className="text-sm text-muted-foreground">
                    Armazene seus documentos pessoais com segurança
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <DocumentOption title="Documentos de Identificação" count={3} />
                <DocumentOption title="Comprovantes de Residência" count={2} />
                <DocumentOption title="Documentos Bancários" count={5} />
                <DocumentOption title="Certidões" count={1} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="holdings" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-4">
                Documentos relacionados às suas holdings aparecerão aqui.
              </p>
              <Button className="w-full">Gerenciar Documentos de Holdings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sucessao" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-4">
                Documentos relacionados ao seu planejamento sucessório aparecerão aqui.
              </p>
              <Button className="w-full">Iniciar Planejamento Sucessório</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface DocumentItemProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  size: string;
}

const DocumentItem = ({ icon, title, date, size }: DocumentItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">
            Adicionado em {date} • {size}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        Visualizar
      </Button>
    </div>
  );
};

interface DocumentOptionProps {
  title: string;
  count: number;
}

const DocumentOption = ({ title, count }: DocumentOptionProps) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50">
      <span>{title}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{count} arquivos</span>
        <Button variant="ghost" size="sm">
          Ver
        </Button>
      </div>
    </div>
  );
};

export default DocumentosPage;
