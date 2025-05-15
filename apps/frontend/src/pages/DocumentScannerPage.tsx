
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, Upload, File } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DocumentScannerPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"scan" | "upload">("scan");
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState("");

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulação de escaneamento
    setTimeout(() => {
      setIsScanning(false);
      setPreviewUrl("/placeholder.svg");
      toast({
        title: "Documento escaneado com sucesso",
        description: "Verifique a imagem e salve-a ou escaneie novamente.",
      });
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setDocumentName(file.name);
    }
  };

  const handleSave = () => {
    if (!previewUrl) {
      toast({
        title: "Erro ao salvar documento",
        description: "Por favor, escaneie ou faça upload de um documento primeiro.",
        variant: "destructive",
      });
      return;
    }

    if (!documentName.trim()) {
      toast({
        title: "Nome do documento obrigatório",
        description: "Por favor, forneça um nome para o documento.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Documento salvo com sucesso",
      description: "O documento foi adicionado à sua holding.",
    });
    
    // Redirecionar de volta para a página anterior
    setTimeout(() => navigate(-1), 1000);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-w1-teal">Scanner de Documentos</h1>
      </div>

      <div className="flex border-b">
        <button 
          className={`flex-1 py-3 text-center ${activeTab === "scan" ? "border-b-2 border-w1-teal text-w1-teal font-medium" : "text-gray-500"}`}
          onClick={() => setActiveTab("scan")}
        >
          <Camera className="h-4 w-4 mx-auto mb-1" />
          Escanear
        </button>
        <button 
          className={`flex-1 py-3 text-center ${activeTab === "upload" ? "border-b-2 border-w1-teal text-w1-teal font-medium" : "text-gray-500"}`}
          onClick={() => setActiveTab("upload")}
        >
          <Upload className="h-4 w-4 mx-auto mb-1" />
          Upload
        </button>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          {activeTab === "scan" ? (
            <div className="text-center space-y-6">
              {!previewUrl ? (
                <>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center">
                    <Camera className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Posicione o documento em uma superfície plana com boa iluminação
                    </p>
                  </div>
                  <Button 
                    onClick={handleScan} 
                    disabled={isScanning} 
                    className="w-full bg-w1-teal hover:bg-w1-teal/90"
                  >
                    {isScanning ? "Escaneando..." : "Escanear Documento"}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-lg p-2">
                    <img 
                      src={previewUrl} 
                      alt="Documento escaneado" 
                      className="w-full h-auto rounded" 
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setPreviewUrl(null);
                        setDocumentName("");
                      }}
                    >
                      Escanear Novamente
                    </Button>
                    <Button 
                      className="flex-1 bg-w1-teal hover:bg-w1-teal/90"
                      onClick={handleSave}
                    >
                      Salvar Documento
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                {!previewUrl ? (
                  <div className="flex flex-col items-center space-y-4">
                    <File className="h-16 w-16 text-gray-300" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Arraste e solte seu documento aqui ou
                      </p>
                      <div>
                        <label htmlFor="file-upload" className="cursor-pointer text-sm text-w1-teal font-medium">
                          Selecione um arquivo
                          <Input 
                            id="file-upload"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <File className="h-8 w-8 text-w1-teal mx-auto" />
                    <p className="font-medium">{documentName}</p>
                    <button 
                      className="text-sm text-w1-teal"
                      onClick={() => {
                        setPreviewUrl(null);
                        setDocumentName("");
                      }}
                    >
                      Alterar arquivo
                    </button>
                  </div>
                )}
              </div>

              {previewUrl && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="document-name">Nome do documento</Label>
                    <Input 
                      id="document-name" 
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="Ex: Contrato Social"
                    />
                  </div>
                  <Button 
                    className="w-full bg-w1-teal hover:bg-w1-teal/90"
                    onClick={handleSave}
                  >
                    Salvar Documento
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentScannerPage;
