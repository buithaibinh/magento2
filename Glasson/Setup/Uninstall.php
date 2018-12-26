<?php
namespace Skg\Glasson\Setup;

use Magento\Framework\Setup\UninstallInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\ModuleContextInterface;

class Uninstall implements UninstallInterface
{

    private $eavSetupFactory;

	public function __construct(EavSetupFactory $eavSetupFactory)
	{
		$this->eavSetupFactory = $eavSetupFactory;
    }
	
    public function uninstall(SchemaSetupInterface $setup, ModuleContextInterface $context)
	{
        $eavSetup = $this->eavSetupFactory->create(['setup' => $setup]);
            $eavSetup->removeAttribute(
            \Magento\Catalog\Model\Product::ENTITY,
            'glasson_id');
    }
}